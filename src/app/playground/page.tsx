"use client"

import { useState, useEffect } from "react"

import Layout from "@/components/layout/public/Layout"
import HeaderGhost from "@/components/layout/public/header/HeaderGhost"
import { Upload, Info, Play, Loader2, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useFileUpload } from "./use-file-upload"
import { runPrediction, getPredictionStatus } from "./fashn"
import type { Category, Mode, Status, PredictionOptions } from "./types"
// import { useToast } from "@/components/ui/use-toast"

export default function AIGarmentGenerator() {
  // File upload states
  const modelUpload = useFileUpload()
  const garmentUpload = useFileUpload()

  // UI states
  const [category, setCategory] = useState<Category>("tops")
  const [mode, setMode] = useState<Mode>("balanced")
  const [samples, setSamples] = useState(1)
  const [seed, setSeed] = useState<number | undefined>(undefined)

  // Option states
  const [coverFeet, setCoverFeet] = useState(false)
  const [adjustHands, setAdjustHands] = useState(false)
  const [restoreBackground, setRestoreBackground] = useState(false)
  const [restoreClothes, setRestoreClothes] = useState(false)

  // API states
  const [isLoading, setIsLoading] = useState(false)
  const [predictionId, setPredictionId] = useState<string | null>(null)
  const [status, setStatus] = useState<any>(null)
  const [result, setResult] = useState<any>(null)

  // const { toast } = useToast()

  // Poll for status when we have a prediction ID
  useEffect(() => {
    if (!predictionId || status === "completed" || status === "failed") return

    const interval = setInterval(async () => {
      try {
        const response = await getPredictionStatus(predictionId)
        setStatus(response.status)

        if (response.status === "completed" && response.output?.[0]) {
          setResult(response.output[0])
          setIsLoading(false)
          clearInterval(interval)
        } else if (response.status === "failed") {
          throw new Error(response.error || "Prediction failed")
        }
      } catch (error) {
        // toast({
        //   title: "Error",
        //   description: error instanceof Error ? error.message : "Error al obtener el estado de la predicción",
        //   variant: "destructive",
        // })
        setIsLoading(false)
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [predictionId, status])

  const handleGenerate = async () => {
    if (!modelUpload.file || !garmentUpload.file) {
      // toast({
      //   title: "Error",
      //   description: "Por favor, sube una imagen del modelo y de la prenda",
      //   variant: "destructive",
      // })
      return
    }

    setIsLoading(true)
    setResult(null)
    setPredictionId(null)
    setStatus(null)

    try {
      const options: any = {
        model_image: modelUpload.file,
        garment_image: garmentUpload.file,
        category,
        cover_feet: coverFeet,
        adjust_hands: adjustHands,
        restore_background: restoreBackground,
        restore_clothes: restoreClothes,
        mode,
        num_samples: samples,
        seed,
      }

      const response = await runPrediction(options)
      setPredictionId(response.id)
      setStatus("starting")
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Error al iniciar la predicción",
      //   variant: "destructive",
      // })
      setIsLoading(false)
    }
  }

  return (
    <Layout where="usuario">
      <HeaderGhost />
      <TooltipProvider>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Select Model Section */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Seleccionar Modelo</h2>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Subir o seleccionar una imagen del modelo</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div
                className="border-2 border-dashed rounded-lg p-8 text-center mb-4 relative"
                onDragOver={(e) => e.preventDefault()}
                onDrop={modelUpload.handleDrop}
              >
                {modelUpload.file ? (
                  <div className="relative">
                    <img
                      src={modelUpload.file || "/placeholder.svg"}
                      alt="Vista previa del modelo"
                      className="max-h-[200px] mx-auto"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={modelUpload.clearFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Pegar/soltar imagen aquí</p>
                    <span className="text-sm text-muted-foreground">OR</span>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => document.getElementById("model-upload")?.click()}
                    >
                      Elegir archivo
                    </Button>
                    <input
                      id="model-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={modelUpload.handleFileSelect}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Cubrir Pies</label>
                  <Switch checked={coverFeet} onCheckedChange={setCoverFeet} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Ajustar Manos</label>
                  <Switch checked={adjustHands} onCheckedChange={setAdjustHands} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Restaurar Fondo</label>
                  <Switch checked={restoreBackground} onCheckedChange={setRestoreBackground} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Restaurar Ropa</label>
                  <Switch checked={restoreClothes} onCheckedChange={setRestoreClothes} />
                </div>
              </div>
            </div>

            {/* Select Garment Section */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Seleccionar Prenda</h2>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Subir o seleccionar una imagen de la prenda</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div
                className="border-2 border-dashed rounded-lg p-8 text-center mb-4 relative"
                onDragOver={(e) => e.preventDefault()}
                onDrop={garmentUpload.handleDrop}
              >
                {garmentUpload.file ? (
                  <div className="relative">
                    <img
                      src={garmentUpload.file || "/placeholder.svg"}
                      alt="Vista previa de la prenda"
                      className="max-h-[200px] mx-auto"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={garmentUpload.clearFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Pegar/soltar imagen aquí</p>
                    <span className="text-sm text-muted-foreground">OR</span>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => document.getElementById("garment-upload")?.click()}
                    >
                      Elegir archivo
                    </Button>
                    <input
                      id="garment-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={garmentUpload.handleFileSelect}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  variant={category === "tops" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setCategory("tops")}
                >
                  Superior
                </Button>
                <Button
                  variant={category === "bottoms" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setCategory("bottoms")}
                >
                  Inferior
                </Button>
                <Button
                  variant={category === "one-pieces" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setCategory("one-pieces")}
                >
                  Cuerpo Completo
                </Button>
              </div>
            </div>

            {/* Result Section */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Resultado</h2>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleGenerate}
                  disabled={isLoading || !modelUpload.file || !garmentUpload.file}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                  {isLoading ? status || "Procesando..." : "Ejecutar (~14s)"}
                </Button>
              </div>

              <div className="border-2 rounded-lg p-8 text-center mb-4 min-h-[200px] flex items-center justify-center">
                {result ? (
                  <img src={result || "/placeholder.svg"} alt="Generated result" className="max-h-[400px]" />
                ) : (
                  <p className="text-muted-foreground">{isLoading ? "Generando..." : "El resultado aparecerá aquí"}</p>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={mode === "performance" ? "secondary" : "ghost"}
                    onClick={() => setMode("performance")}
                    className="text-sm"
                  >
                    Rendimiento
                  </Button>
                  <Button
                    variant={mode === "balanced" ? "secondary" : "ghost"}
                    onClick={() => setMode("balanced")}
                    className="text-sm"
                  >
                    Equilibrado
                  </Button>
                  <Button
                    variant={mode === "quality" ? "secondary" : "ghost"}
                    onClick={() => setMode("quality")}
                    className="text-sm"
                  >
                    Calidad
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Número de Muestras</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Seleccionar el número de muestras a generar</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[samples]}
                    onValueChange={(value: any) => setSamples(value[0])}
                    min={1}
                    max={4}
                    step={1}
                    className="mb-4"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Semilla</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ingresar un valor de semilla para resultados reproducibles</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    placeholder="Aleatorio"
                    type="number"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </Layout>
  )
}


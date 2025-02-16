"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { Status, PredictionOptions } from "../../../../types/ai-garment-generator"
import { getPredictionStatus, runPrediction } from "./services/ai-garment-generator" // Import the missing functions

interface AIGarmentModalProps {
  isOpen: boolean
  onClose: () => void
  userImage: string | null
  productImage: any
  productName: string
  prenda: string
}

export default function AIGarmentModal({ isOpen, onClose, userImage, productImage, productName, prenda }: AIGarmentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [predictionId, setPredictionId] = useState<string | null>(null)
  const [status, setStatus] = useState<Status | null>(null)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    if (!predictionId || status === "completed" || status === "failed") return

    const interval = setInterval(async () => {
      try {
        const response = await getPredictionStatus(predictionId)

        if (response.status === undefined) return

        setStatus(response.status)

        if (response.status === "completed" && response.output?.[0]) {
          setResult(response.output[0])
          setIsLoading(false)
          clearInterval(interval)
        } else if (response.status === "failed") {
          throw new Error(response.error || "Prediction failed")
        }
      } catch (error) {
        console.error("Error al obtener el estado de la predicción:", error)
        setIsLoading(false)
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [predictionId, status])

  const transformCategory = (prenda: string) => {
    switch (prenda) {
      case "top":
        return "tops";
      case "botton":
        return "bottoms";
      case "full_body":
        return "one-pieces";
      default:
        return "tops"; // Valor por defecto
    }
  };

  const translateStatus = (status: Status | null) => {
    switch (status) {
      case "starting":
        return "Iniciando...";
      case "processing":
        return "Procesando...";
      case "completed":
        return "Completado";
      case "failed":
        return "Fallido";
      default:
        return "Iniciando";
    }
  };

  const handleGenerate = async () => {
    if (!userImage) {
      console.error("Por favor, sube una foto tuya primero.")
      return
    }

    setIsLoading(true)
    setResult(null)
    setPredictionId(null)
    setStatus(null)

    console.log(prenda)
    console.log(transformCategory(prenda))

    try {
      const options: PredictionOptions = {
        model_image: userImage,
        garment_image: productImage,
        category: transformCategory(prenda),
        mode: "balanced",
      }

      const response = await runPrediction(options)
      setPredictionId(response.id)
      setStatus("starting")
    } catch (error) {
      console.error("Error al iniciar la predicción:", error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prueba virtual: {productName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {result ? (
            <img src={result || "/placeholder.svg"} alt="Generated result" className="w-full h-auto" />
          ) : (
            <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p>{translateStatus(status)}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">La imagen generada aparecerá aquí</p>
              )}
            </div>
          )}
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {isLoading ? "Procesando..." : "Generar imagen"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
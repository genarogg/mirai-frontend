'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Shirt } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { URL_BACKEND } from '@env'

interface ComoMeQuedariaProps {
  showFitRecommendation: boolean;
  setShowFitRecommendation: (showFitRecommendation: boolean) => void;
  handleTryOnGarment: () => void;
  slug: string;
}

const ComoMeQuedaria: React.FC<ComoMeQuedariaProps> = ({
  showFitRecommendation,
  setShowFitRecommendation,
  handleTryOnGarment,
  slug
}) => {
  const [response, setResponse] = React.useState("")

  // Función para limpiar el texto recibido
  const cleanText = (text: string) => {
    return text
      // Elimina los backslashes que no formen parte de "\n"
      .replace(/\\(?!n)/g, '')
      // Convierte "\n" en saltos de línea reales
      .replace(/\\n/g, '\n')
      // Colapsa secuencias de comillas a una sola (por si vienen repetidas)
      .replace(/"+/g, '"')
      // Elimina todas las comillas restantes para que el texto se vea natural
      .replace(/"/g, '')
  }

  const preguntarComoMeQueda = async () => {
    const token = localStorage.getItem("token")

    try {
      const res = await fetch(`${URL_BACKEND}/ia/meQueda`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ slug })
      })

      if (!res.body) {
        throw new Error("La respuesta no tiene cuerpo")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let done = false

      // Reiniciamos el estado para ir concatenando la respuesta limpia
      setResponse("")

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunk = decoder.decode(value, { stream: !done })

        // Procesamos las líneas que comienzan con "data: "
        const lines = chunk.split('\n').filter(line => line.startsWith('data: '))
        lines.forEach((line) => {
          // Quitamos el prefijo "data: "
          const dataStr = line.replace(/^data:\s*/, '')
          try {
            // Limpiamos el texto recibido para eliminar comillas y otros caracteres no deseados
            const naturalText = cleanText(dataStr)
            setResponse(prev => prev + naturalText)
          } catch (error) {
            console.error("Error al procesar el chunk:", error)
          }
        })
      }
    } catch (error) {
      console.error("Error al obtener la respuesta del backend:", error)
    }
  }

  return (
    <>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            preguntarComoMeQueda()
            setShowFitRecommendation(!showFitRecommendation)
          }}
        >
          ¿Cómo me quedaría?
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleTryOnGarment}>
          <Shirt className="mr-2 h-4 w-4" />
          Probarme la prenda
        </Button>
      </div>

      {showFitRecommendation && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">
              {response}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default ComoMeQuedaria

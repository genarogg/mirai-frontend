"use client"

import type React from "react"

import { useState, useCallback } from "react"

export function useFileUpload() {
  const [file, setFile] = useState<string | null>(null)

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setFile(reader.result as string)
      }
      reader.readAsDataURL(droppedFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setFile(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }, [])

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const blob = items[i].getAsFile()
          if (blob) {
            const reader = new FileReader()
            reader.onload = () => {
              setFile(reader.result as string)
            }
            reader.readAsDataURL(blob)
          }
        }
      }
    }
  }, [])

  const clearFile = useCallback(() => {
    setFile(null)
  }, [])

  return {
    file,
    setFile,
    handleDrop,
    handleFileSelect,
    handlePaste,
    clearFile,
  }
}


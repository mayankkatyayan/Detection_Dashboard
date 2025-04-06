"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Upload, X } from "lucide-react"
import type { DetectionResult } from "@/lib/types"
import { drawDetections } from "@/lib/detection-utils"
import Image from "next/image"
import { useTheme } from "next-themes"

export function UploadDetection() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([])
  const [hasDetectedFault, setHasDetectedFault] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string)
      setDetectionResults([])
    }
    reader.readAsDataURL(file)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const clearImage = () => {
    setUploadedImage(null)
    setDetectionResults([])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const runDetection = async () => {
    if (!uploadedImage) return

    setIsUploading(true)

    try {
      // Convert data URL to blob
      const response = await fetch(uploadedImage)
      const blob = await response.blob()

      const formData = new FormData()
      formData.append("image", blob, "uploaded-image.jpg")

      const detectionResponse = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      })

      if (!detectionResponse.ok) throw new Error("Detection failed")

      const data = await detectionResponse.json()
      setDetectionResults(data.detections)

      // Check if any fault was detected
      const hasFault = data.detections.some((det: DetectionResult) => det.class === "insulator_fault")
      setHasDetectedFault(hasFault)

      // Draw bounding boxes on canvas
      setTimeout(() => {
        if (canvasRef.current) {
          const canvas = canvasRef.current
          const context = canvas.getContext("2d")

          if (context) {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
              canvas.width = img.width
              canvas.height = img.height
              context.drawImage(img, 0, 0)
              drawDetections(context, data.detections)
            }
            img.src = uploadedImage
          }
        }
      }, 100)
    } catch (error) {
      console.error("Error during detection:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
            {uploadedImage ? (
              <div className="relative w-full h-full">
                <Image src={uploadedImage || "/placeholder.svg"} alt="Uploaded image" fill className="object-contain" />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80"
                  onClick={clearImage}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear image</span>
                </Button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer"
                onClick={handleUploadClick}
              >
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Upload an image</p>
                <p className="text-sm text-muted-foreground text-center">
                  Drag and drop or click to upload an image of an insulator
                </p>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4">
            {uploadedImage ? (
              <>
                <Button variant="outline" onClick={clearImage}>
                  Clear Image
                </Button>
                <Button onClick={runDetection} disabled={isUploading}>
                  {isUploading ? "Processing..." : "Run Detection"}
                </Button>
              </>
            ) : (
              <Button onClick={handleUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Detection Results</h3>

          {detectionResults.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={hasDetectedFault ? "destructive" : "secondary"}>
                  {hasDetectedFault ? (
                    <AlertTriangle className="mr-1 h-3 w-3" />
                  ) : (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  )}
                  {hasDetectedFault ? "Fault Detected" : "No Fault"}
                </Badge>
                <span className="text-sm text-muted-foreground">{new Date().toLocaleTimeString()}</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Detected Objects:</h4>
                {detectionResults.map((detection, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{detection.class.replace("_", " ")}</span>
                      <Badge variant="outline">{(detection.confidence * 100).toFixed(1)}%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Position: [{detection.bbox.join(", ")}]</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {uploadedImage ? <p>Run detection to see results</p> : <p>Upload an image to start</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


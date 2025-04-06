"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Camera, CheckCircle, Pause, Play } from "lucide-react"
import type { DetectionResult } from "@/lib/types"
import { drawDetections } from "@/lib/detection-utils"
import { useTheme } from "next-themes"

export function WebcamDetection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [detectionActive, setDetectionActive] = useState(false)
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([])
  const [hasDetectedFault, setHasDetectedFault] = useState(false)
  const { theme } = useTheme()

  // Start webcam stream
  const startWebcam = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (err) {
      console.error("Error accessing webcam:", err)
    }
  }, [])

  // Stop webcam stream
  const stopWebcam = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()

      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
      setDetectionActive(false)
    }
  }, [])

  // Toggle detection
  const toggleDetection = useCallback(() => {
    setDetectionActive((prev) => !prev)
  }, [])

  // Capture frame and send for detection
  const captureFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !detectionActive) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return

      const formData = new FormData()
      formData.append("image", blob, "webcam-capture.jpg")

      try {
        const response = await fetch("/api/webcam-detect", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Detection failed")

        const data = await response.json()
        setDetectionResults(data.detections)

        // Check if any fault was detected
        const hasFault = data.detections.some((det: DetectionResult) => det.class === "insulator_fault")
        setHasDetectedFault(hasFault)

        // Draw bounding boxes on canvas
        drawDetections(context, data.detections)
      } catch (error) {
        console.error("Error during detection:", error)
      }
    }, "image/jpeg")
  }, [detectionActive])

  // Run detection loop
  useEffect(() => {
    let detectionInterval: NodeJS.Timeout

    if (detectionActive) {
      detectionInterval = setInterval(captureFrame, 1000) // Run detection every second
    }

    return () => {
      if (detectionInterval) clearInterval(detectionInterval)
    }
  }, [detectionActive, captureFrame])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopWebcam()
    }
  }, [stopWebcam])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <div className="relative aspect-video bg-black rounded-md overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-contain" autoPlay playsInline muted />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

            {!isStreaming && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
                <Camera className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium mb-4">Camera not active</p>
                <Button onClick={startWebcam}>Start Camera</Button>
              </div>
            )}

            {detectionActive && (
              <Badge variant="outline" className="absolute top-4 right-4 bg-black/50 text-white border-none">
                Live Detection Active
              </Badge>
            )}
          </div>

          <div className="flex justify-between mt-4">
            {isStreaming ? (
              <>
                <Button variant="outline" onClick={stopWebcam}>
                  Stop Camera
                </Button>
                <Button onClick={toggleDetection}>
                  {detectionActive ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause Detection
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Detection
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={startWebcam}>
                <Camera className="mr-2 h-4 w-4" />
                Start Camera
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
              {detectionActive ? <p>Waiting for detection results...</p> : <p>Start detection to see results</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


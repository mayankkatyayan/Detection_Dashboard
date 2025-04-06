import type { DetectionResult } from "./types"

// Draw bounding boxes on canvas
export function drawDetections(context: CanvasRenderingContext2D, detections: DetectionResult[]) {
  // Check if we're in dark mode
  const isDarkMode = document.documentElement.classList.contains("dark")

  detections.forEach((detection) => {
    const [x, y, width, height] = detection.bbox
    const isFault = detection.class === "insulator_fault"

    // Set styles based on detection class and theme
    context.strokeStyle = isFault ? "#ef4444" : "#22c55e"
    context.lineWidth = 2
    context.fillStyle = isFault ? "rgba(239, 68, 68, 0.3)" : "rgba(34, 197, 94, 0.2)"

    // Draw rectangle
    context.fillRect(x, y, width, height)
    context.strokeRect(x, y, width, height)

    // Draw label background
    const label = `${detection.class.replace("_", " ")} ${(detection.confidence * 100).toFixed(0)}%`
    const textMetrics = context.measureText(label)
    const textHeight = 20
    context.fillStyle = isFault ? "rgba(239, 68, 68, 0.8)" : "rgba(34, 197, 94, 0.8)"
    context.fillRect(x, y - textHeight, textMetrics.width + 10, textHeight)

    // Draw label text - white for both themes
    context.fillStyle = "#ffffff"
    context.font = "14px Arial"
    context.fillText(label, x + 5, y - 5)
  })
}


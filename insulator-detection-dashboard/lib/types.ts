export interface DetectionResult {
  class: string
  confidence: number
  bbox: number[] // [x, y, width, height]
}


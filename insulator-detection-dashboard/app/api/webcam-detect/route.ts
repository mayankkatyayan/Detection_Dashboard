import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File | null

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Simulate processing time (shorter for real-time)
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock detection results
    const detections = [
      {
        class: "insulator_fault",
        confidence: 0.89,
        bbox: [150, 100, 180, 140],
      },
      {
        class: "insulator_normal",
        confidence: 0.93,
        bbox: [350, 200, 160, 120],
      },
    ]

    return NextResponse.json({
      success: true,
      detections,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Webcam detection error:", error)
    return NextResponse.json({ error: "Failed to process webcam image" }, { status: 500 })
  }
}


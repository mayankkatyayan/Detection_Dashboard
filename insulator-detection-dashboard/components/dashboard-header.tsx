"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Insulator Fault Detection</h1>
      </div>
      <p className="text-muted-foreground">
        Monitor and detect faults in electric insulators using YOLOv7 computer vision
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <Card>
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <Camera className="h-12 w-12 text-primary" />
            <div className="text-center">
              <h2 className="text-xl font-semibold">Real-time Detection</h2>
              <p className="text-muted-foreground mt-1">Use webcam or connected camera for live detection</p>
            </div>
            <Button className="w-full" asChild>
              <Link href="/realtime">Start Detection</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <Upload className="h-12 w-12 text-primary" />
            <div className="text-center">
              <h2 className="text-xl font-semibold">Upload & Detect</h2>
              <p className="text-muted-foreground mt-1">Upload images for fault detection analysis</p>
            </div>
            <Button className="w-full" asChild>
              <Link href="/upload">Upload Images</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


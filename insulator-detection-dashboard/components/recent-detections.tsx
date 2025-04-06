"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function RecentDetections() {
  // In a real app, these would come from your backend
  const recentDetections = [
    {
      id: "det-001",
      timestamp: "Today, 10:30 AM",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: true,
      confidence: 0.92,
      source: "Upload",
    },
    {
      id: "det-002",
      timestamp: "Today, 09:15 AM",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: false,
      confidence: 0.89,
      source: "Webcam",
    },
    {
      id: "det-003",
      timestamp: "Yesterday, 4:45 PM",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: true,
      confidence: 0.87,
      source: "Upload",
    },
    {
      id: "det-004",
      timestamp: "Yesterday, 2:30 PM",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: false,
      confidence: 0.94,
      source: "Webcam",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Detections</CardTitle>
          <CardDescription>Latest insulator scans and results</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/history">
            View All
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentDetections.map((detection) => (
            <div key={detection.id} className="border rounded-lg overflow-hidden">
              <div className="relative h-40 w-full">
                <Image
                  src={detection.imageUrl || "/placeholder.svg"}
                  alt="Insulator scan"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={detection.hasFault ? "destructive" : "secondary"}>
                    {detection.hasFault ? (
                      <AlertTriangle className="mr-1 h-3 w-3" />
                    ) : (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    )}
                    {detection.hasFault ? "Fault Detected" : "No Fault"}
                  </Badge>
                  <Badge variant="outline">{detection.source}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">{detection.timestamp}</div>
                <div className="text-xs mt-1">Confidence: {(detection.confidence * 100).toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


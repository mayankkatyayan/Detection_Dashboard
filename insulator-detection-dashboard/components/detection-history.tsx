"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Calendar, CheckCircle, ChevronDown, Download, Eye, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

export function DetectionHistory() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  // In a real app, these would come from your backend
  const detectionHistory = [
    {
      id: "det-001",
      timestamp: "2023-04-04 10:30:45",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: true,
      confidence: 0.92,
      source: "Upload",
      location: "Substation A",
    },
    {
      id: "det-002",
      timestamp: "2023-04-04 09:15:22",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: false,
      confidence: 0.89,
      source: "Webcam",
      location: "Substation B",
    },
    {
      id: "det-003",
      timestamp: "2023-04-03 16:45:10",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: true,
      confidence: 0.87,
      source: "Upload",
      location: "Substation A",
    },
    {
      id: "det-004",
      timestamp: "2023-04-03 14:30:05",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: false,
      confidence: 0.94,
      source: "Webcam",
      location: "Substation C",
    },
    {
      id: "det-005",
      timestamp: "2023-04-02 11:20:33",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: true,
      confidence: 0.91,
      source: "Upload",
      location: "Substation B",
    },
    {
      id: "det-006",
      timestamp: "2023-04-02 09:05:18",
      imageUrl: "/placeholder.svg?height=200&width=300",
      hasFault: false,
      confidence: 0.88,
      source: "Webcam",
      location: "Substation A",
    },
  ]

  // Filter detections based on selected filter
  const filteredDetections = detectionHistory.filter((detection) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "faults") return detection.hasFault
    if (selectedFilter === "no-faults") return !detection.hasFault
    if (selectedFilter === "upload") return detection.source === "Upload"
    if (selectedFilter === "webcam") return detection.source === "Webcam"
    return true
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search detections..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={selectedFilter === "all"}
                    onCheckedChange={() => setSelectedFilter("all")}
                  >
                    All Detections
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedFilter === "faults"}
                    onCheckedChange={() => setSelectedFilter("faults")}
                  >
                    Faults Only
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedFilter === "no-faults"}
                    onCheckedChange={() => setSelectedFilter("no-faults")}
                  >
                    No Faults Only
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedFilter === "upload"}
                    onCheckedChange={() => setSelectedFilter("upload")}
                  >
                    Uploads Only
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedFilter === "webcam"}
                    onCheckedChange={() => setSelectedFilter("webcam")}
                  >
                    Webcam Only
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline">
                <Download className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:ml-2">Export</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDetections.map((detection) => (
                  <TableRow key={detection.id}>
                    <TableCell>
                      <div className="relative h-12 w-16 rounded overflow-hidden">
                        <Image
                          src={detection.imageUrl || "/placeholder.svg"}
                          alt="Insulator scan"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{detection.id}</TableCell>
                    <TableCell>{detection.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={detection.hasFault ? "destructive" : "secondary"}>
                        {detection.hasFault ? (
                          <AlertTriangle className="mr-1 h-3 w-3" />
                        ) : (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}
                        {detection.hasFault ? "Fault" : "No Fault"}
                      </Badge>
                    </TableCell>
                    <TableCell>{(detection.confidence * 100).toFixed(1)}%</TableCell>
                    <TableCell>
                      <Badge variant="outline">{detection.source}</Badge>
                    </TableCell>
                    <TableCell>{detection.location}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


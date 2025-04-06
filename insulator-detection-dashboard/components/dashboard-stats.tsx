"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, Image } from "lucide-react"

export function DashboardStats() {
  // In a real app, these would come from your backend
  const stats = [
    {
      title: "Total Scans",
      value: "1,284",
      icon: Image,
      description: "Total images processed",
    },
    {
      title: "Faults Detected",
      value: "37",
      icon: AlertTriangle,
      description: "Across all scans",
    },
    {
      title: "Healthy Insulators",
      value: "1,247",
      icon: CheckCircle,
      description: "No faults detected",
    },
    {
      title: "Last Detection",
      value: "2m ago",
      icon: Clock,
      description: "Most recent scan",
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Camera, History, Home, Settings, Upload, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      name: "Real-time Detection",
      path: "/realtime",
      icon: Camera,
    },
    {
      name: "Upload & Detect",
      path: "/upload",
      icon: Upload,
    },
    {
      name: "Detection History",
      path: "/history",
      icon: History,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 border-r bg-background h-screen flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="font-bold text-xl">Insulator AI</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex-1 py-4 px-2 space-y-1">
        {routes.map((route) => (
          <Button
            key={route.path}
            variant={pathname === route.path ? "secondary" : "ghost"}
            className={cn("w-full justify-start", pathname === route.path && "bg-secondary")}
            asChild
          >
            <Link href={route.path}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.name}
            </Link>
          </Button>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">YOLOv7 Insulator Fault Detection v1.0</div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ModelSettings() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5)

  return (
    <Tabs defaultValue="model">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="model">Model Settings</TabsTrigger>
        <TabsTrigger value="camera">Camera Settings</TabsTrigger>
        <TabsTrigger value="system">System Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="model" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>YOLOv7 Model Configuration</CardTitle>
            <CardDescription>Configure the detection model parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                <span className="text-sm text-muted-foreground">{(confidenceThreshold * 100).toFixed(0)}%</span>
              </div>
              <Slider
                id="confidence-threshold"
                min={0.1}
                max={0.9}
                step={0.05}
                value={[confidenceThreshold]}
                onValueChange={(value) => setConfidenceThreshold(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Minimum confidence level required for a detection to be considered valid
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="model-version">Model Version</Label>
                <Select defaultValue="yolov7">
                  <SelectTrigger id="model-version">
                    <SelectValue placeholder="Select model version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yolov7">YOLOv7 (Default)</SelectItem>
                    <SelectItem value="yolov7-tiny">YOLOv7-Tiny</SelectItem>
                    <SelectItem value="yolov7-custom">Custom Trained Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inference-device">Inference Device</Label>
                <Select defaultValue="gpu">
                  <SelectTrigger id="inference-device">
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpu">GPU (Recommended)</SelectItem>
                    <SelectItem value="cpu">CPU</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model-path">Custom Model Path</Label>
              <Input id="model-path" placeholder="/path/to/custom/model.pt" />
              <p className="text-xs text-muted-foreground">Path to a custom trained YOLOv7 model file (optional)</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="nms-switch">Non-Maximum Suppression</Label>
                <p className="text-xs text-muted-foreground">Remove overlapping bounding boxes</p>
              </div>
              <Switch id="nms-switch" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Classes Configuration</CardTitle>
            <CardDescription>Configure detection classes and labels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class-insulator-fault">Insulator Fault</Label>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded bg-red-500 flex-shrink-0" />
                    <Input id="class-insulator-fault" defaultValue="insulator_fault" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class-insulator-normal">Normal Insulator</Label>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded bg-green-500 flex-shrink-0" />
                    <Input id="class-insulator-normal" defaultValue="insulator_normal" />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Add New Class
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="camera" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Camera Configuration</CardTitle>
            <CardDescription>Configure webcam and camera settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="camera-source">Camera Source</Label>
              <Select defaultValue="webcam">
                <SelectTrigger id="camera-source">
                  <SelectValue placeholder="Select camera source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webcam">Webcam</SelectItem>
                  <SelectItem value="ip-camera">IP Camera</SelectItem>
                  <SelectItem value="rtsp">RTSP Stream</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="camera-url">Camera URL/RTSP Stream</Label>
              <Input id="camera-url" placeholder="rtsp://username:password@192.168.1.100:554/stream" />
              <p className="text-xs text-muted-foreground">For IP cameras or RTSP streams, enter the URL</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="resolution">Resolution</Label>
                <Select defaultValue="640x480">
                  <SelectTrigger id="resolution">
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="320x240">320x240</SelectItem>
                    <SelectItem value="640x480">640x480</SelectItem>
                    <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                    <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fps">Frame Rate (FPS)</Label>
                <Select defaultValue="15">
                  <SelectTrigger id="fps">
                    <SelectValue placeholder="Select FPS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 FPS</SelectItem>
                    <SelectItem value="10">10 FPS</SelectItem>
                    <SelectItem value="15">15 FPS</SelectItem>
                    <SelectItem value="30">30 FPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-focus">Auto Focus</Label>
                <p className="text-xs text-muted-foreground">Enable camera auto focus</p>
              </div>
              <Switch id="auto-focus" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="system" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="storage-path">Storage Path</Label>
              <Input id="storage-path" defaultValue="/app/data/detections" />
              <p className="text-xs text-muted-foreground">Path where detection results and images will be stored</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retention-period">Data Retention Period</Label>
              <Select defaultValue="30">
                <SelectTrigger id="retention-period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="0">Indefinite</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">How long to keep detection data before automatic deletion</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Send email alerts when faults are detected</p>
              </div>
              <Switch id="notifications" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Notification Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-start">Auto-start Detection</Label>
                <p className="text-xs text-muted-foreground">Automatically start detection on system startup</p>
              </div>
              <Switch id="auto-start" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}


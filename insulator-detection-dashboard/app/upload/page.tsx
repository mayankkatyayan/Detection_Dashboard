import { UploadDetection } from "@/components/upload-detection"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to dashboard</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Upload & Detect</h1>
        </div>
      </div>
      <UploadDetection />
    </div>
  )
}


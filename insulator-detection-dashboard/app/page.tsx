import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentDetections } from "@/components/recent-detections"

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <DashboardStats />
      <RecentDetections />
    </div>
  )
}


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, MoreVertical, PillIcon as Capsule, ClipboardCopy } from "lucide-react"
import Link from "next/link"

export default function MedicationPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Link href="/reminders">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="font-medium">Medication</div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="text-gray-500 mb-2">Active course</div>
          <h1 className="text-2xl font-semibold mb-4">Roaccutane 30mg</h1>
          <p className="text-gray-500">
            Isotretinoin, also known as 13-cis-retinoic acid and sold under the brand name Accutane among others, is a
            medication primarily used to treat severe acne.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium">Schedule</div>
              <Button variant="outline" size="icon">
                <span className="text-xl">+</span>
              </Button>
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>07:00-09:00</div>
                  <div>18:00-20:00</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-green-100">
                <Capsule className="h-5 w-5" />
              </div>
              <div className="font-medium">Capsules</div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-medium">6 months</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Dose</div>
                <div className="font-medium">2/day</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Frequency</div>
                <div className="font-medium">Daily</div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="font-medium mb-4">Progress</div>
            <div className="text-sm text-gray-500 mb-2">Course started 12 Jan 2023</div>
            <Progress value={40} className="mb-4" />
            <Card className="bg-blue-500 text-white">
              <CardContent className="p-4 flex items-center gap-2">
                <ClipboardCopy className="h-5 w-5" />
                <div>
                  <div className="font-medium">Possible side effects</div>
                  <div className="text-sm opacity-90">Learn more about this medication, its side effects...</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


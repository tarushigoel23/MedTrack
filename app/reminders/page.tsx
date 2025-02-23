"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { PlusIcon, Pill, Droplets, PillIcon as Capsule } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function RemindersPage() {
  const [date, setDate] = useState<Date>(new Date())

  const medications = [
    {
      time: "7:00 AM",
      name: "Carsil 35mg",
      dosage: "2 tablets",
      icon: Pill,
      color: "bg-blue-100",
    },
    {
      time: "7:00 AM",
      name: "Roaccutane 30mg",
      dosage: "1 capsule",
      icon: Capsule,
      color: "bg-green-100",
      href: "/medication",
    },
    {
      time: "12:00 PM",
      name: "CardioActive 20ml",
      dosage: "20 drops",
      icon: Droplets,
      color: "bg-orange-100",
    },
    {
      time: "6:00 PM",
      name: "Carsil 35mg",
      dosage: "2 tablets",
      icon: Pill,
      color: "bg-blue-100",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Avatar className="h-8 w-8" />
          <Button size="icon" variant="ghost">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>

        <h1 className="text-2xl font-semibold mb-4">Today reminders</h1>

        <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} className="mb-6" />

        <div className="space-y-4">
          {medications.map((med, index) => {
            const MedIcon = med.icon
            const content = (
              <Card key={index} className="relative">
                <CardContent className="flex items-center p-4">
                  <div className="w-20 text-sm text-gray-500">{med.time}</div>
                  <div className="flex-1">
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-gray-500">{med.dosage}</div>
                  </div>
                  <div className={`p-2 rounded-lg ${med.color}`}>
                    <MedIcon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            )

            return med.href ? (
              <Link key={index} href={med.href}>
                {content}
              </Link>
            ) : (
              <div key={index}>{content}</div>
            )
          })}
        </div>

        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-2">
              <div className="flex justify-around">
                <Button variant="ghost" className="flex-1">
                  Today
                </Button>
                <Button variant="ghost" className="flex-1">
                  Calendar
                </Button>
                <Button variant="ghost" className="flex-1">
                  Medications
                </Button>
                <Button variant="ghost" className="flex-1">
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


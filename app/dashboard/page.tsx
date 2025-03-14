"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar } from "@/components/ui/avatar"
import { PlusIcon, Bell, Calendar, User, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock data for medications
const medications = [
  { id: 1, name: "Roaccutane", dosage: "30mg", remaining: 3, refillLink: "https://example.com/refill/roaccutane" },
  { id: 2, name: "Carsils", dosage: "35mg", remaining: 10, refillLink: "https://example.com/refill/carsil" },
  { id: 3, name: "CardioActive", dosage: "20ml", remaining: 1, refillLink: "https://example.com/refill/cardioactive" },
]

// Mock data for nearby pharmacies
const pharmacies = [
  { id: 1, name: "City Pharmacy", distance: "0.5 miles", address: "123 Main St" },
  { id: 2, name: "Health Plus", distance: "1.2 miles", address: "456 Oak Ave" },
  { id: 3, name: "MediCare", distance: "1.8 miles", address: "789 Pine Rd" },
]

export default function DashboardPage() {
  const [lowMedications, setLowMedications] = useState<typeof medications>([])

  useEffect(() => {
    // Check for medications that are running low (less than 5 doses remaining)
    const low = medications.filter((med) => med.remaining < 5)
    setLowMedications(low)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Avatar className="h-8 w-8" />
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        <h1 className="text-2xl font-semibold mb-6">Welcome back, John</h1>

        {lowMedications.length > 0 && (
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold">Medication Alerts</h2>
            {lowMedications.map((med) => (
              <Alert key={med.id} variant="destructive">
                <AlertTitle>Low Supply: {med.name}</AlertTitle>
                <AlertDescription>
                  You have {med.remaining} doses remaining.
                  <Link
                    href={med.refillLink}
                    className="ml-2 text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Order refill <ExternalLink className="inline h-4 w-4" />
                  </Link>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">Nearby Pharmacies</h2>
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{pharmacy.name}</h3>
                  <p className="text-sm text-gray-500">{pharmacy.address}</p>
                  <p className="text-sm text-gray-500">{pharmacy.distance}</p>
                </div>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-2">
              <div className="flex justify-around">
                <Button variant="ghost" className="flex-1">
                  <Bell className="h-4 w-4" />
                </Button>
                <Link href="/reminders" className="flex-1">
                  <Button variant="ghost" className="w-full">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/prescriptions" className="flex-1">
                  <Button variant="ghost" className="w-full">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" className="flex-1">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


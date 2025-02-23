"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle authentication
    // For now, we'll just navigate to the dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 aspect-square mb-8">
          <div className="bg-blue-100 rounded-tl-[40px]"></div>
          <div className="bg-blue-100 rounded-tr-[40px]"></div>
          <div className="bg-blue-500 rounded-bl-[40px]"></div>
          <div className="bg-blue-100 rounded-br-[40px]"></div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome to MedTrack</h1>
          <p className="text-gray-500">Sign in to manage your medications</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Link href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </Link>
          <div className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="#" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


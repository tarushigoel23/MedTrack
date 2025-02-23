"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, ChevronLeft, ImageIcon, MoreVertical, RefreshCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PrescriptionsPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImages, setCapturedImages] = useState<string[]>([])
  const [isCameraActive, setIsCameraActive] = useState(false)

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsCameraActive(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsCameraActive(false)
  }

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const imageUrl = canvas.toDataURL("image/jpeg")
        setCapturedImages((prev) => [...prev, imageUrl])
        stopCamera()
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Link href="/reminders">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="font-medium">Prescriptions</div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {isCameraActive ? (
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-black rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" onClick={stopCamera}>
                <RefreshCcw className="h-5 w-5" />
              </Button>
              <Button size="icon" onClick={captureImage}>
                <Camera className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Camera className="h-8 w-8 text-blue-500" />
                  <div>
                    <h2 className="font-semibold mb-1">Capture Prescription</h2>
                    <p className="text-sm text-gray-500">Take a photo of your prescription or medicine</p>
                  </div>
                  <Button onClick={startCamera}>Open Camera</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Recent Photos</h2>
                <Button variant="ghost" size="sm">
                  See all
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {capturedImages.map((imageUrl, index) => (
                  <div key={index} className="aspect-[3/4] relative rounded-lg overflow-hidden border">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Prescription ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {capturedImages.length === 0 && (
                  <Card className="aspect-[3/4] flex items-center justify-center">
                    <CardContent className="text-center p-4">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">No photos yet</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}


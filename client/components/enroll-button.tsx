"use client"

import { Button } from "@/components/ui/button"
import { useEnrollment } from "./enrollment-context"

export default function EnrollButton() {
  const { openModal } = useEnrollment()

  return (
    <Button
      onClick={openModal}
      className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-8 py-3 rounded-full text-lg font-medium"
    >
      Enroll Now
    </Button>
  )
}

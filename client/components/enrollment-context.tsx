"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface EnrollmentContextType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined)

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <EnrollmentContext.Provider value={{ isModalOpen, openModal, closeModal }}>{children}</EnrollmentContext.Provider>
  )
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext)
  if (context === undefined) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider")
  }
  return context
}

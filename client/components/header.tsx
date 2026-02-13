"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation" // ✅ ADD THIS
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEnrollment } from "./enrollment-context"

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

interface Course {
  _id: string
  bannerSection: {
    courseName: string
  }
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const { openModal } = useEnrollment()
  const pathname = usePathname() // ✅ Current active route

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/coursedetails`)
        const data = await res.json()
        setCourses(data)
      } catch (err) {
        console.error("Error fetching courses:", err)
      }
    }
    fetchCourses()
  }, [])

  // ✅ Helper to check if a link is active
  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/vijanaar-logo.png" alt="Vijanaar" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive("/") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors ${
                isActive("/about") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
              }`}
            >
              About us
            </Link>

            {/* Training Program Dropdown */}
            {/* Training Program Dropdown (hover) */}
            <div className="relative group">
              <Link href="/training">
              <button className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium flex items-center">
                Training Program
                <ChevronDownIcon />
              </button></Link>
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {courses.map((course) => (
                    <Link
                      key={course._id}
                      href={`/training/${course._id}`}
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-50 hover:text-[#FF6B35] transition-colors"
                    >
                      {course.bannerSection.courseName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/placements"
              className={`font-medium transition-colors ${
                isActive("/placements") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
              }`}
            >
              Placements
            </Link>
            <Link
              href="/testimonial"
              className={`font-medium transition-colors ${
                isActive("/testimonial") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
              }`}
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors ${
                isActive("/contact") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
              }`}
            >
              Contact us
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4 mr-[20px] xl:mr-0">
            <a
              href="https://wa.me/919963492139"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center text-gray-700 hover:text-green-600 transition"
            >
              <svg className="w-5 h-5 mr-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
              <span className="font-medium">+91 99634-92139</span>
            </a>

            <Button
              onClick={openModal}
              className="bg-[#FF6B35] hidden md:flex hover:bg-[#E55A2B] text-white px-6 py-2 rounded-full font-medium"
            >
              Enroll Now
            </Button>

            <button className="xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  isActive("/") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors ${
                  isActive("/about") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
                }`}
              >
                About us
              </Link>

              <div className="relative">
                <Link href="/training">
                <button
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  className={`font-medium flex items-center justify-start w-full transition-colors ${
                    pathname.startsWith("/training") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
                  }`}
                >
                  Training Program
                  <ChevronDownIcon />
                </button>
                </Link>
                {isMobileDropdownOpen && (
                  <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-[60%]">
                    <div className="py-2">
                      {courses.map((course) => (
                        <Link
                          key={course._id}
                          href={`/training/${course._id}`}
                          className="block px-4 py-2 text-gray-900 hover:bg-gray-50 hover:text-[#FF6B35] transition-colors"
                        >
                          {course.bannerSection.courseName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/placements"
                className={`font-medium transition-colors ${
                  isActive("/placements") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
                }`}
              >
                Placements
              </Link>
              <Link
                href="/testimonial"
                className={`font-medium transition-colors ${
                  isActive("/testimonial") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
                }`}
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className={`font-medium transition-colors ${
                  isActive("/contact") ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
                }`}
              >
                Contact us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

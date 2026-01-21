"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useEnrollment } from "./enrollment-context"
import axios from "axios"

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export default function EnrollmentModal() {
  const { isModalOpen, closeModal } = useEnrollment()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    mode: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [courses, setCourses] = useState<{ courseName: string }[]>([])

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/coursedetails`)
        const data = await res.json()
        const courseList = data.map((course: any) => ({
          courseName: course.bannerSection?.courseName || "",
        }))
        setCourses(courseList)
      } catch (error) {
        console.error("Error fetching courses:", error)
      }
    }

    fetchCourses()
  }, [])

  const validateForm = () => {
    let newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number"
    }
    if (!formData.course) newErrors.course = "Please select a course"
    if (!formData.mode) newErrors.mode = "Please select a training mode"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    // ✅ Send data to your backend API instead of EmailJS
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courseenquiry`,
      {
        name: formData.name,
        email: formData.email,
        mobilenumber: formData.mobile,
        courseName: formData.course,
        modeoftraining: formData.mode,
      }
    );

    alert(response.data.message || "Form submitted successfully! Our team will reach out to you soon.");
    closeModal();
    setFormData({
      name: "",
      email: "",
      mobile: "",
      course: "",
      mode: "",
      agreeToTerms: false,
    });
    setErrors({});
  } catch (error: any) {
    console.error("Course Enquiry Error:", error);
    alert(error.response?.data?.error || "Failed to send form. Please try again later.");
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <XIcon />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-light text-[26px] text-[#27AAE1] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              Enroll Now!
            </h2>
            <p
              className="font-light text-[14px] text-[#454545] leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Kindly provide the details below, and our team
              <br />
              will get in touch with you soon.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block font-normal text-[14px] text-[#000] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                Name<span className="text-[#FF0000]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border-0 border-b border-[#D1C3C3] focus:border-[#27AAE1] outline-none py-2 font-normal text-[14px] text-[#000] bg-transparent"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-normal text-[14px] text-[#000] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                Email address<span className="text-[#FF0000]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border-0 border-b border-[#D1C3C3] focus:border-[#27AAE1] outline-none py-2 font-normal text-[14px] text-[#000] bg-transparent"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block font-normal text-[14px] text-[#000] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                Mobile number<span className="text-[#FF0000]">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                className="w-full border-0 border-b border-[#D1C3C3] focus:border-[#27AAE1] outline-none py-2 font-normal text-[14px] text-[#000] bg-transparent"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>

            {/* Select Course (Dynamic) */}
            <div>
              <label className="block font-normal text-[14px] text-[#000] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                Select Course<span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative">
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  className="w-full border-0 border-b border-[#D1C3C3]  focus:border-[#27AAE1] outline-none py-2 font-normal text-[14px] text-[#000] bg-transparent appearance-none pr-8"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <option value="" disabled hidden>
                    Select a course
                  </option>
                  {courses.map((c, idx) => (
                    <option key={idx} value={c.courseName} className="pl-6 outline-none border-0">
                      {c.courseName}
                    </option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
              {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
            </div>

            {/* Mode of Training */}
            <div>
              <label className="block font-normal text-[14px] text-[#000] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                Select mode of training<span className="text-[#FF0000]">*</span>
              </label>
              <div className="relative">
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleInputChange}
                  required
                  className="w-full border-0 border-b border-[#D1C3C3] focus:border-[#27AAE1] outline-none py-2 font-normal text-[14px] text-[#000] bg-transparent appearance-none pr-8"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <option value="" disabled hidden>
                    Select mode
                  </option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
              {errors.mode && <p className="text-red-500 text-xs mt-1">{errors.mode}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3 mt-6">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                className="mt-1 w-4 h-4 text-[#27AAE1] border-gray-300 rounded focus:ring-[#27AAE1]"
              />
              <p className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
                By Providing your contact details, you agree to our{" "}
                <span className="underline cursor-pointer">Terms of use</span> &{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>
              </p>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#F57F20] hover:bg-[#E56A0B] text-white py-4 rounded-full text-lg font-semibold mt-8"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Enroll Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

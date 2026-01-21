"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState, useEffect } from "react"
import noData from "../../public/icons/noData.jpg"
import axios from "axios"

type ContactData = {
  bannerSection: {
    title: string
    subTitle: string
    backgroundImageUrl: string
  }
  sectionOne: {
    title: string
    description: string
    googleMapEmbdedLink: string
  }
}

type Address = {
  default: boolean
  address: string
}

type HeadOfficeData = {
  phone1: string
  phone2: string
  email1: string
  email2: string
  address: Address[]
}

export default function ContactPage() {
  const [data, setData] = useState<ContactData | null>(null)
  const [headOfficeData, setHeadOfficeData] = useState<HeadOfficeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  })
  const [responseMessage, setResponseMessage] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  // new validation error state
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contactuspage`)
      const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companydetails`)

      const finalHeadOfficeData: HeadOfficeData = {
        phone1: response2.data.sectionOne.phone1,
        phone2: response2.data.sectionOne.phone2,
        email1: response2.data.sectionOne.email1,
        email2: response2.data.sectionOne.email2,
        address: response2.data.addresses.filter((eachItem: Address) => eachItem.default === true),
      }
      setData(response.data)
      setHeadOfficeData(finalHeadOfficeData)
      setFailed(false)
    } catch (error) {
      console.log(error)
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: { email?: string; phone?: string } = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[6-9]\d{9}$/ // Indian phone numbers start 6-9, 10 digits

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "❌ Wrong email format"
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "❌ Wrong number (should be 10 digits Indian number)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setResponseMessage(null)

    if (!validateForm()) return // stop submission if validation fails

    setSending(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contactusform`, formData)
      if (res.status === 200) {
        setResponseMessage("✅ Your message has been sent successfully!")
        setFormData({ name: "", email: "", phone: "", message: "", subject: "" })
        setErrors({})
      }
    } catch (err: any) {
      setResponseMessage(
        err.response?.data?.error || "❌ Failed to send message. Please try again."
      )
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-gray-600 text-[30px]">Loading....</h1>
      </div>
    )
  }

  if (failed || !data || !headOfficeData) {
    return (
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <Image src={noData} alt="server" height={300} width={300} />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={fetchData}
        >
          Reload
        </button>
      </div>
    )
  }

  return (
    <main>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-start"
          style={{
            backgroundImage: `url(${data.bannerSection.backgroundImageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-pink-400/10"></div>
          <div className="relative z-10  text-white max-w-4xl  pl-[40px] md:pl-[100px]">
            <h1 className="font-bold text-[35px]"> {data.bannerSection.title} </h1>
            <p className="font-light text-[20px]"> {data.bannerSection.subTitle} </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-center gap-[40px]">
              {/* Head Office Info */}
              <div className="shadow p-[30px] rounded-2xl">
                <h3 className="mb-3 text-[23px] font-semibold text-[#27AAE1]">Head Office</h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-center space-x-4">
                    <Image src="/icons/address-contact.png" alt="Address" width={60} height={60} />
                    <p className="text-[14px] text-[#656565] max-w-lg">{headOfficeData.address[0].address}</p>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-center space-x-4">
                    <Image src="/icons/phone-contact.png" alt="Phone" width={60} height={60} />
                    <div>
                      <p className="text-[14px] text-[#656565]">
                        {headOfficeData.phone1}
                        <br />
                        {headOfficeData.phone2}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-4">
                    <Image src="/icons/mail-contact.png" alt="Email" width={60} height={60} />
                    <div>
                      <p className="text-[14px] text-[#656565]">
                        {headOfficeData.email1}
                        <br />
                        {headOfficeData.email2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="shadow p-[30px] rounded-2xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27AAE1] focus:border-transparent outline-none"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27AAE1] focus:border-transparent outline-none"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="tel"
                        value={formData.phone}
                        placeholder="Phone Number"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27AAE1] focus:border-transparent outline-none"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData.subject}
                        placeholder="Subject"
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27AAE1] focus:border-transparent outline-none"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="How can we help you? Feel free to get in touch!"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27AAE1] focus:border-transparent outline-none resize-none"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                    ></textarea>
                  </div>

                  {responseMessage && (
                    <p
                      className={`text-sm ${
                        responseMessage.startsWith("✅")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {responseMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-auto h-[40px] py-3 text-white font-medium rounded-3xl transition-colors"
                    style={{
                      backgroundColor: "#F57F20",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {sending ? "Sending..." : "Submit message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src={data.sectionOne.googleMapEmbdedLink}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type CompanyDetails = {
  sectionOne: {
    headerLogoUrl: string
    footerLogoUrl: string
    favIconUrl: string
    companyName: string
    phone1: string
    phone2: string
    email1: string
    email2: string
  }
  socialMediaLinks: {
    facebook: string
    instagram: string
    twitter: string
    youtube: string
    linkedin: string
    google: string
  }
  addresses: {
    default: boolean
    address: string
  }[]
  digitalMarketingTags: {
    metaDescription: string
    metaTags: string
    gTags: string
    googleVerificationLink: string
  }
}

export default function Footer() {
  const [companyData, setCompanyData] = useState<CompanyDetails | null>(null)
  const [defaultAddress, setDefaultAddress] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companydetails`)
        if (!res.ok) throw new Error("Failed to fetch company details")
        const data: CompanyDetails = await res.json()

        setCompanyData(data)

        // Find default address
        const defaultAddr = data.addresses.find(addr => addr.default === true)
        if (defaultAddr) {
          setDefaultAddress(defaultAddr.address)
        }
      } catch (err) {
        console.error("Error fetching company details:", err)
      }
    }

    fetchCompanyDetails()
  }, [])

  return (
    <>
      {/* Top Info Cards */}
      <div className="bg-[#27282A] py-6 border-b border-white">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
          {/* Phone Card */}
          <div className="flex items-center gap-4 bg-white rounded-lg p-4 border-b border-[#d5cdcd] shadow-md min-w-xs">
            <Image src="/icons/phone-footer.png" alt="Phone" width={30} height={30} />
            <div>
              <p className="text-sm text-gray-600">Contact us</p>
              <p className="text-blue-600 font-semibold text-[12px]">
                {companyData?.sectionOne?.phone1} {companyData?.sectionOne?.phone2?"|":""} {companyData?.sectionOne?.phone2}
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="flex items-center gap-4 bg-white rounded-lg p-4 border-b border-white shadow-md min-w-xs">
            <Image src="/icons/email-footer.png" alt="Email" width={30} height={30} />
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="text-blue-600 font-semibold text-[12px]">
                {companyData?.sectionOne?.email1}
              </p>
            </div>
          </div>

          {/* Time Card */}
          <div className="flex items-center gap-4 bg-white rounded-lg p-4 border-b border-white shadow-md min-w-xs">
            <Image src="/icons/time-footer.png" alt="Time" width={30} height={30} />
            <div>
              <p className="text-sm text-gray-600">Mon - Sat</p>
              <p className="text-blue-600 font-semibold text-[12px]">8:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Main */}
      <footer className="bg-[#27282A] text-white">
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-8">
              {/* Company Info */}
              <div className="col-span-1">
                <div className="mb-4">
                  <Image
                    src={companyData?.sectionOne?.footerLogoUrl || "/vijanaar-logo-footer.png"}
                    alt={companyData?.sectionOne?.companyName || "Company Logo"}
                    width={180}
                    height={60}
                    className="mb-2"
                  />
                </div>
                <p className="text-gray-400 text-justify mb-6 text-sm leading-relaxed max-w-xs">
                  We pride ourselves on the trust and reputation we've built over the years. As we look to the future, our
                  commitment remains unchanged.
                </p>
                <div className="flex space-x-3">
                  {companyData?.socialMediaLinks?.facebook && (
                    <a href={companyData.socialMediaLinks.facebook} target="_blank" rel="noreferrer">
                      <Image src="/icons/facebook-footer.png" alt="Facebook" width={32} height={32} />
                    </a>
                  )}
                  {companyData?.socialMediaLinks?.twitter && (
                    <a href={companyData.socialMediaLinks.twitter} target="_blank" rel="noreferrer">
                      <Image src="/icons/x-footer.png" alt="X (Twitter)" width={32} height={32} />
                    </a>
                  )}
                  {companyData?.socialMediaLinks?.linkedin && (
                    <a href={companyData.socialMediaLinks.linkedin} target="_blank" rel="noreferrer">
                      <Image src="/icons/linkedin-footer.png" alt="LinkedIn" width={32} height={32} />
                    </a>
                  )}
                  {companyData?.socialMediaLinks?.instagram && (
                    <a href={companyData.socialMediaLinks.instagram} target="_blank" rel="noreferrer">
                      <Image src="/icons/instagram-footer.png" alt="Instagram" width={32} height={32} />
                    </a>
                  )}
                  {companyData?.socialMediaLinks?.youtube && (
                    <a href={companyData.socialMediaLinks.youtube} target="_blank" rel="noreferrer">
                      <Image src="/icons/youtube-footer.png" alt="YouTube" width={32} height={32} />
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-span-1">
                <h3 className="text-white font-semibold mb-4 text-sm">QUICK LINK</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white text-sm">Home</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">Company</Link></li>
                  <li><Link href="/courses" className="text-gray-400 hover:text-white text-sm">Training Program</Link></li>
                  <li><Link href="/placements" className="text-gray-400 hover:text-white text-sm">Placements</Link></li>
                  <li><Link href="/testimonials" className="text-gray-400 hover:text-white text-sm">Testimonials</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact us</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div className="col-span-1">
                <h3 className="text-white font-semibold mb-4 text-sm">RESOURCES</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Course Videos</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Success Stories</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Book Demo</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Registration</Link></li>
                </ul>
              </div>

              {/* Courses */}
              <div className="col-span-1">
                <h3 className="text-white font-semibold mb-4 text-sm">COURSES OFFERED</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Data Science</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Online Data Science</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Advanced Generative AI</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Full Stack Web Development</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Digital Marketing</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="col-span-1">
                <h3 className="text-white font-semibold mb-4 text-sm">CONTACT</h3>
                <div className="space-y-2 text-gray-400 text-sm">
                  {defaultAddress && <p>{defaultAddress}</p>}

                  <div className="flex items-center space-x-2 mt-4">
                    <Image src="/icons/phone-footer.png" alt="Phone" width={20} height={20} />
                    <p className="text-white text-sm">{companyData?.sectionOne?.phone1}</p>
                  </div>
                  {
                    companyData?.sectionOne?.phone2 && (
                      <div className="flex items-center space-x-2">
                    <Image src="/icons/phone-footer.png" alt="Phone" width={20} height={20} />
                    <p className="text-white text-sm">{companyData?.sectionOne?.phone2}</p>
                  </div>
                    )
                  }
                  <div className="flex items-center space-x-2">
                    <Image src="/icons/email-footer.png" alt="Email" width={20} height={20} />
                    <p className="text-white text-sm">{companyData?.sectionOne?.email1}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-[#FF6B35] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white">
              Copyright © 2024, {companyData?.sectionOne?.companyName || "Company"}. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

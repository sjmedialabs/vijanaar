"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { ChangeEvent, FormEvent } from "react"

interface CourseDetail {
  _id: string
  bannerSection: {
    courseName: string
    backgroundImageUrl: string
    imageUrl: string
    title: string
    subTitle: string
    courseFee: number
    duration: string
    startDate: string
    trainingMode: string
  }
  sectionOne: {
    imageUrl: string
    title: string
  }[]
  sectionTwo: {
    title: string
    description1: string
    description2: string
  }
  curriculum: {
    title: string
    points: {
      description: string
    }[]
  }[]
  onlineTraining: {
    description1: string
    description2: string
  }
  SelfplaceTraining: {
    description1: string
    description2: string
  }
  classroomTraining: {
    description1: string
    description2: string
  }
  CorporateTraining: {
    description1: string
    description2: string
  }
  advantagesSection: {
    title: string
    advantages: {
      description: string
    }[]
  }
  toolsSection: {
    title: string
    tools: {
      imageUrl: string
      description: string
    }[]
  }
  videoSection: {
    videoUrl: string
  }
  enrollSection: {
    title: string
    description: string
    points: {
      imageeUrl: string
      description: string
    }[]
  }
  oppurtunitiesSection: {
    title: string
    jobs: {
      jobTitle: string
    }[]
  }
  highLightsSection: {
    title: string
    highlights: {
      description: string
    }[]
  }
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("Online Training")
  const [showVideoPopup, setShowVideoPopup] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // renamed variable

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setResponseMsg("");

  // ✅ Validation for email and Indian phone number
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/; // 10 digits, starts with 6-9

  if (!emailRegex.test(formData.email)) {
    setResponseMsg("❌ Please enter a valid email address");
    return;
  }

  if (!phoneRegex.test(formData.phone)) {
    setResponseMsg("❌ Please enter a valid 10-digit Indian mobile number");
    return;
  }

  setIsSubmitting(true); // show sending status
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/enquiryform`,
      formData
    );
    setResponseMsg(res.data.message || "Enquiry submitted successfully ✅");
    setFormData({ fullName: "", email: "", phone: "", qualification: "" }); // reset form
  } catch (err: any) {
    setResponseMsg(err.response?.data?.error || "Something went wrong ❌");
  } finally {
    setIsSubmitting(false); // stop sending status
  }
};


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/coursedetails/${id}`)
        const data = await res.json()
        setCourse(data)
      } catch (err) {
        console.error("Failed to fetch course:", err)
      }
    }

    if (id) fetchCourse()
  }, [id])

  if (!course) return <p className="text-center py-16">Loading...</p>

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Banner Section */}
      <section
        className="relative py-16 -mr-20 md:-mr-12 bg-right bg-no-repeat h-[850px] md:h-[760px]"
        style={{
          backgroundImage: `url(${course.bannerSection.backgroundImageUrl})`
        }}
      >
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
          <div className="flex items-center absolute top-1/4">
            {/* Left Content */}
            <div className="">
                <div className="w-80 lg:w-150">
              <h1
                className="font-bold mb-6 leading-tight lg:text-[42px] text-[30px]"
                style={{
                  color: "#27AAE1",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                

                }}
              >
                {course.bannerSection.title}
              </h1>
              <p
                className="mb-8 leading-relaxed lg:text-[22px] text-[18px]"
                style={{
                  color: "#000",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                }}
              >
                {course.bannerSection.subTitle}
              </p>
                </div>
              {/* Course Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <img src="/images/solar-calendar-outline.png" alt="Calendar" className="w-14 h-14" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Programme Starts</p>
                    <p className="text-lg font-bold text-gray-900">{course.bannerSection.startDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <img src="/images/mingcute-time-duration-line.png" alt="Duration" className="w-14 h-14" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Duration</p>
                    <p className="text-lg font-bold text-gray-900">{course.bannerSection.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img src="/images/ri-money-rupee-circle-fill.png" alt="Fees" className="w-14 h-14" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Programme Fees</p>
                    <p className="text-lg font-bold text-gray-900">₹{course.bannerSection.courseFee} + GST</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-6 text-lg font-medium rounded-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Download Brochuer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Course Highlights */}
        <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {course.sectionOne.map((highlight, index) => (
                <div
                key={index}
                className="text-center p-6 rounded-[20px]"
                style={{ backgroundColor: "#E7EAF3" }}
                >
                <img
                    src={highlight.imageUrl} // dynamic image
                    alt={highlight.title}    // dynamic alt text
                    className="w-12 h-12 mx-auto mb-4"
                />
                <p
                    className="text-center"
                    style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    }}
                >
                    {highlight.title} {/* dynamic text */}
                </p>
                </div>
            ))}
            </div>
        </div>
        </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Course Description */}
               <div className="mb-12">
  <h2
    className="mb-6"
    style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
      fontSize: "20px",
      color: "#27AAE1",
    }}
  >
    {course.sectionTwo.title}
  </h2>

  <div
    className="mb-4 leading-relaxed"
    style={{
      color: "#656565",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "12px",
    }}
    dangerouslySetInnerHTML={{ __html: course.sectionTwo.description1 }}
  />

  <div
    className="mb-6 leading-relaxed"
    style={{
      color: "#656565",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "12px",
    }}
    dangerouslySetInnerHTML={{ __html: course.sectionTwo.description2 }}
  />
               </div>



              {/* Curriculum */}
             <div className="mb-12">
  <h3
    className="mb-6"
    style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
      fontSize: "20px",
      color: "#50BAE7",
    }}
  >
    Course Curriculum
  </h3>
  <div className="space-y-4">
    {course.curriculum.map((module, index) => (
      <Card key={index} className="border border-gray-200">
        <CardContent className="p-0">
          <button
            onClick={() => toggleModule(index)}
            className="w-full text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            style={{ padding: "10px" }}
          >
            <span className="font-medium text-gray-900">{module.title}</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                expandedModule === index ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {expandedModule === index && (
            <div className="border-t border-gray-100" style={{ padding: "10px" }}>
              <ul className="space-y-2 mt-2.5">
                {module.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span
                      className="text-gray-600 text-sm"
                      dangerouslySetInnerHTML={{ __html: point.description }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
              </div>


              
                {/* Technology Stack */}
                <div className="mb-12">
  <h3
    className="mb-6"
    style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
      fontSize: "20px",
      color: "#27AAE1",
    }}
  >
    {course.toolsSection.title}
  </h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {course.toolsSection.tools.map((tool, index) => (
      <div
        key={index}
        className="text-center p-4 border border-solid rounded-lg"
        style={{ borderColor: "#EAEAEA", padding: "15px" }}
      >
        <img
          src={tool.imageUrl}
          alt={tool.description.replace(/<[^>]+>/g, "")} // strip HTML for alt
          className="w-12 h-12 mx-auto mb-3"
        />
        <span
          className="text-center block text-sm text-gray-600"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "#656565",
          }}
          dangerouslySetInnerHTML={{ __html: tool.description }}
        />
      </div>
    ))}
  </div>
                </div>
 

              {/* Training Options Section */}
              <div className="mb-12">
  <h3
    className="mb-6"
    style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
      fontSize: "20px",
      color: "#27AAE1",
    }}
  >
    Training Options
  </h3>

  <Card className="border border-gray-200">
    <CardContent className="p-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-8 mb-6 border-b border-gray-200">
        {["Online Training", "Self-Paced Training", "Classroom Training", "Corporate Training"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === tab ? "border-blue-400" : "border-transparent"
              }`}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: activeTab === tab ? "#42B5E5" : "#000",
              }}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "Online Training" && (
          <>
            <div
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: course.onlineTraining.description1 }}
            />
            <div
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: course.onlineTraining.description2 }}
            />
          </>
        )}

        {activeTab === "Self-Paced Training" && (
          <>
            <div
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: course.SelfplaceTraining.description1 }}
            />
            <div
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: course.SelfplaceTraining.description2 }}
            />
          </>
        )}

        {activeTab === "Classroom Training" && (
          <>
            <div
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: course.classroomTraining.description1 }}
            />
            <div
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: course.classroomTraining.description2 }}
            />
          </>
        )}

        {activeTab === "Corporate Training" && (
          <>
            <div
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: course.CorporateTraining.description1 }}
            />
            <div
              className="text-sm text-black leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{ __html: course.CorporateTraining.description2 }}
            />
          </>
        )}
      </div>
    </CardContent>
  </Card>
              </div>


              {/* Advantages Section */}
             <div className="mb-12">
  <h3
    className="mb-6"
    style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
      fontSize: "20px",
      color: "#27AAE1",
    }}
  >
    {course.advantagesSection.title}
  </h3>

  <div className="space-y-4">
    {course.advantagesSection.advantages.map((advantage, index) => (
      <div key={index} className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "#000",
            lineHeight: "1.6",
          }}
          dangerouslySetInnerHTML={{ __html: advantage.description }}
        />
      </div>
    ))}
  </div>
             </div>

                </div>
            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3
                    className="mb-6"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontSize: "20px",
                      color: "#50BAE7",
                    }}
                  >
                    Request More Information
                  </h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        className="mt-1"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="mt-1"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="mt-1"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="qualification" className="text-sm font-medium text-gray-700">
                        Qualification
                      </Label>
                      <Input
                        id="qualification"
                        name="qualification"
                        placeholder="Your highest qualification"
                        className="mt-1"
                        value={formData.qualification}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Response or sending message */}
                    {isSubmitting ? (
                      <p className="text-sm text-center text-gray-500">Sending… ⏳</p>
                    ) : responseMsg ? (
                      <p className="text-sm text-center text-gray-600">{responseMsg}</p>
                    ) : null}

                    <Button
                      type="submit"
                      className={`w-full bg-orange-500 hover:bg-orange-600 text-white ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={isSubmitting} // disable button while sending
                    >
                      Submit Enquiry
                    </Button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Join our next Batch starting - {course.bannerSection.startDate}</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{course.bannerSection.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mode:</span>
                        <span className="font-medium">{course.bannerSection.trainingMode}</span>
                      </div>
                      {/*<div className="flex justify-between">
                        <span className="text-gray-600">Batch Size:</span>
                        <span className="font-medium">Max 20</span>
                      </div>*/}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fee:</span>
                        <span className="font-medium text-orange-600">₹{course.bannerSection.courseFee}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">Book Your Seat Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
        
        </div>
        </div>
      </section>

      {/* Video Section */}
      {course.videoSection?.videoUrl && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative cursor-pointer" onClick={() => setShowVideoPopup(true)}>
              <video
                src={course.videoSection.videoUrl}
                controls
                className="w-full h-120 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
          </div>
        </section>
      )}

        {/* Who Can Enroll Section */}
        <section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Enroll Section */}
    <div className="mb-12">
      <h3
        className="mb-8"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "20px",
          color: "#27AAE1",
        }}
        dangerouslySetInnerHTML={{ __html: course.enrollSection?.title || "Who can enroll This Course" }}
      />

      <p
        className="mb-8"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          color: "#000",
          lineHeight: "1.6",
        }}
        dangerouslySetInnerHTML={{ __html: course.enrollSection?.description || "This Data Science Course is specifically ideal for people who are" }}
      />

      <div className="space-y-6">
        {course.enrollSection?.points?.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#27AAE1" }}
            >
              <img src={item.imageeUrl} alt={item.description} className="w-8 h-8" />
            </div>
            <div className="flex-1 mt-2 md:mt-4">
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "#000",
                  lineHeight: "1.6",
                }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Job Opportunities Section */}
    <div className="mb-12">
      <h3
        className="mb-8"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "20px",
          color: "#27AAE1",
        }}
        dangerouslySetInnerHTML={{ __html: course.oppurtunitiesSection?.title || "Job opportunities in Data Science" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.oppurtunitiesSection?.jobs?.map((job, index) => {
          const gradients = [
            "linear-gradient(135deg, #FF6B35, #F7931E)",
            "linear-gradient(135deg, #4A90E2, #357ABD)",
            "linear-gradient(135deg, #B8B8B8, #8E8E8E)",
            "linear-gradient(135deg, #E91E63, #C2185B)",
            "linear-gradient(135deg, #9C27B0, #673AB7)",
            "linear-gradient(135deg, #2196F3, #4CAF50)",
            "linear-gradient(135deg, #673AB7, #3F51B5)",
            "linear-gradient(135deg, #FF9800, #2196F3)",
          ]
          const gradient = gradients[index % gradients.length]

          return (
            <div
              key={index}
              className="relative p-4 rounded-lg text-center"
              style={{ background: gradient, padding: "2px" }}
            >
              <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#000",
                  }}
                  dangerouslySetInnerHTML={{ __html: job.jobTitle }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
        </section>



      {/* Key Highlights Section */}
     <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
    <h2
      className="text-center mb-12"
      style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "20px",
        color: "#27AAE1",
      }}
      dangerouslySetInnerHTML={{ __html: course.highLightsSection?.title || "" }}
    />

    <div className="space-y-4">
      {course.highLightsSection?.highlights?.map((highlight: any, index: number) => (
        <div
          key={index}
          className="w-full p-6 border border-gray-200 rounded-lg"
        >
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "#000",
            }}
            dangerouslySetInnerHTML={{ __html: highlight.description }}
          />
        </div>
      ))}
    </div>
  </div>
</section>


      <Footer />
    </main>
  )
}

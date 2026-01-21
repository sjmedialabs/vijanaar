"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import VideoModal from "./video-modal"
import Link from "next/link"

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

type HeroSlide = {
  title: string
  titleVisible?: boolean
  subTitle: string
  subTitleVisible?: boolean
  description?: string
  descriptionVisible?: boolean
  videoUrl: string
  backgroundImageUrl: string
  buttonsVisible?: boolean
}


interface HeroSectionProps {
  slides: HeroSlide[]
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setVideoLoading(true) // reset loader on slide change
  }
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setVideoLoading(true)
  }

  const slide = slides[currentSlide]

  // Detect if background is video
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url)

  return (
    <>
      <section className="relative h-[100vh] overflow-hidden">
        {/* Background: Video or Image */}
        {isVideo(slide.backgroundImageUrl) ? (
          <>
            {videoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white mt-4 absolute bottom-20">Loading video...</p>
              </div>
            )}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={slide.backgroundImageUrl}
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={() => setVideoLoading(false)} // hide loader when ready
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-gray-900 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${slide.backgroundImageUrl}')`,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center max-w-4xl mx-auto">
              {slide.titleVisible && (
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                  {slide.title}
                </h1>
              )}

              {slide.subTitleVisible && (
                <div
                  className="text-xl md:text-2xl text-white mb-8 drop-shadow-xl"
                  dangerouslySetInnerHTML={{ __html: slide.subTitle }}
                />
              )}

              {slide.descriptionVisible && slide.description && (
                <div
                  className="text-lg text-white mb-8 drop-shadow-xl"
                  dangerouslySetInnerHTML={{ __html: slide.description }}
                />
              )}

              {/* Buttons */}
              {slide.buttonsVisible && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-white text-gray-900 bg-white hover:bg-gray-100 hover:text-gray-900 px-8 py-3 rounded-full text-lg font-medium flex items-center justify-center gap-2"
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    <PlayIcon />
                    Watch Demo
                  </Button>
                  <Link href={"/training"}>
                  <Button className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-8 py-3 rounded-full text-lg font-medium">
                    Explore our Courses
                  </Button></Link>
                </div>
              )}
            </div>
          </div>
        </div>

          {slides.length > 1 && (
            <>
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-20"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-20"
              >
                <ChevronRightIcon />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index)
                      setVideoLoading(true)
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-[#FF6B35]" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={slide.videoUrl}
      />
    </>
  )
}

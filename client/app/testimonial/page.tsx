"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import TestimonialCard from "@/components/testimonial-cards";

interface BannerSection {
  title: string;
  subTitle: string; // contains HTML
  backgroundImageUrl: string;
}

interface Testimonial {
  imageUrl: string;
  name: string;
  role: string;
  description: string; // contains HTML
}

interface SectionOne {
  title: string;
  subTitle: string;
  testimonials: Testimonial[];
}

interface TestimonialsPageData {
  bannerSection: BannerSection;
  sectionOne: SectionOne;
}

export default function TestimonialsPage() {
  const [data, setData] = useState<TestimonialsPageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${baseUrl}/testimonialspage`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch testimonials page:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading testimonials...</p>
      </div>
    );
  }

  // Handle full image URL (prepend base URL if needed)
  const bgImageUrl = data.bannerSection.backgroundImageUrl.startsWith("http")
    ? data.bannerSection.backgroundImageUrl
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.bannerSection.backgroundImageUrl}`;

  return (
    <main>
      <Header />
      <div className="w-full">
        {/* ✅ Hero Section using Next/Image */}
        <section className="relative h-[603px] flex items-center justify-start">
          <div className="absolute inset-0">
            <Image
              src={bgImageUrl}
              alt="Testimonials Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 text-start text-white px-6 md:px-28">
            <h1
              className="font-bold"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "44px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              {data.bannerSection.title}
            </h1>
            <p
              className="mt-3"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 300,
                fontSize: "30px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
              dangerouslySetInnerHTML={{ __html: data.bannerSection.subTitle }}
            />
          </div>
        </section>

        {/* ✅ Testimonials Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-lg font-semibold text-[#1A4886]">
              {data.sectionOne.title}
            </h2>
            <h3 className="text-2xl font-bold mt-2 text-[#27AAE1]">
              {data.sectionOne.subTitle}
            </h3>
          </div>

          <div className="flex gap-14 flex-wrap justify-items-center">
            {data.sectionOne.testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                imageUrl={testimonial.imageUrl}
                name={testimonial.name}
                role={testimonial.role}
                description={testimonial.description}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

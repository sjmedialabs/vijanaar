"use client"

import Slider from "react-slick"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

type Alumni = {
  title: string
  subTitle: string
  images: {
    imageUrl: string
  }[]
}

interface AlumniSectionProps {
  data: Alumni
}

export default function AlumniSection({ data }: AlumniSectionProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul style={{ margin: "0px", padding: 0 }}>{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#FFA500", // orange color for active dot
          margin: "0 5px",
        }}
      />
    ),
  }

  return (
    <section className="py-12 bg-white">
      <h2 className="text-center text-[#27AAE1] font-semibold tracking-tight uppercase mb-8 text-xl md:text-2xl">{data.title}</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>
          {data.images.map((img, index) => (
            <div key={index} className="flex justify-center items-center p-4">
              <Image src={img.imageUrl} alt={`Alumni ${index + 1}`} width={120} height={50} className="object-contain" />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

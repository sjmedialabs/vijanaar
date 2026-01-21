import Image from "next/image"
import Link from "next/link"

type About = {
  title: string
  subTitle: string
  points: { title: string; description: string }[]
  imageUrl: string
}

interface AboutVijanarProps {
  data: About
}

export default function AboutVijanar({ data }: AboutVijanarProps) {
  return (
    <section className="py-16" style={{ backgroundColor: "#f5f9ff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-[#4A90E2] font-medium mb-2">About Vijanar</p>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight uppercase text-[#4A90E2] mb-6">
              {data.title}
            </h2>

            {/* Subtitle from CKEditor */}
            <div
              className="text-gray-600 mb-8 leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: data.subTitle }}
            />

            {/* Feature Cards */}
            <div className="space-y-4 mb-8">
              {data.points.map((point, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {point.title}
                  </h3>
                  <div
                    className="text-gray-600 text-sm prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: point.description }}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Read More...
              </button></Link>
              <button className="bg-[#FF6B35] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e55a2b] transition-colors">
                Watch More videos
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src={data.imageUrl}
              alt="Students collaborating and learning"
              width={600}
              height={500}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

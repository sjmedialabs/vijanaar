import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const courses = [
  {
    id: 1,
    title: "Python",
    description: "Master Python programming with hands-on projects and real-world applications.",
    image: "/python-programming-code.png",
    trending: true,
    duration: "6 months",
    level: "Beginner to Advanced",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Learn data analysis, machine learning, and statistical modeling techniques.",
    image: "/data-science-analytics-dashboard.jpg",
    trending: true,
    duration: "8 months",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "AI-ML",
    description: "Explore artificial intelligence and machine learning algorithms and applications.",
    image: "/ai-machine-learning-neural-network.jpg",
    trending: false,
    duration: "10 months",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Gen AI",
    description: "Master generative AI technologies including GPT, image generation, and more.",
    image: "/generative-ai-technology-brain.jpg",
    trending: true,
    duration: "6 months",
    level: "Intermediate to Advanced",
  },
]

export default function CourseCards() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#FF6B35] font-medium mb-2">Courses Offered</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">OUR PROGRAMS & ACCREDITATION</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {course.trending && (
                  <span className="absolute top-4 left-4 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Trending
                  </span>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{course.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Duration:</span> {course.duration}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Level:</span> {course.level}
                  </p>
                </div>
                <Button className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-full font-medium">
                  Explore More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

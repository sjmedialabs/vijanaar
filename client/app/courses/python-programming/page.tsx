import Header from "@/components/header"
import Footer from "@/components/footer"
import EnrollButton from "@/components/enroll-button"

export default function PythonProgrammingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Python Programming</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Master Python programming from basics to advanced concepts. Build real-world applications and prepare for
              a successful career in software development.
            </p>
            <EnrollButton />
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
              <p className="text-gray-600 mb-6">
                Our comprehensive Python Programming course is designed for beginners and intermediate learners who want
                to master one of the most popular programming languages in the world.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-3"></span>
                  45 days intensive training program
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-3"></span>
                  Hands-on projects and assignments
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-3"></span>
                  Industry-relevant curriculum
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-3"></span>
                  Placement assistance
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">45 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode:</span>
                  <span className="font-medium">Online/Offline</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">Beginner to Advanced</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-medium">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Course Curriculum</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Module 1: Python Fundamentals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Introduction to Python</li>
                <li>• Variables and Data Types</li>
                <li>• Control Structures</li>
                <li>• Functions and Modules</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Module 2: Object-Oriented Programming</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Classes and Objects</li>
                <li>• Inheritance and Polymorphism</li>
                <li>• Encapsulation</li>
                <li>• Exception Handling</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Module 3: Advanced Python</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• File Handling</li>
                <li>• Regular Expressions</li>
                <li>• Database Connectivity</li>
                <li>• Web Scraping</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Module 4: Frameworks & Projects</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Django/Flask Framework</li>
                <li>• API Development</li>
                <li>• Real-world Projects</li>
                <li>• Deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

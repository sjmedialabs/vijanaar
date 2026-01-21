import Header from "@/components/header"
import Footer from "@/components/footer"
import EnrollButton from "@/components/enroll-button"

export default function DataSciencePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Data Science</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Unlock the power of data with our comprehensive Data Science program. Learn statistical analysis, machine
              learning, and data visualization techniques.
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
                Our Data Science course covers everything from data collection and cleaning to advanced machine learning
                algorithms and data visualization.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-3"></span>
                  60 days comprehensive program
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-3"></span>
                  Real-world datasets and projects
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-3"></span>
                  Industry tools and technologies
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-3"></span>
                  Job placement support
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">60 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode:</span>
                  <span className="font-medium">Online/Offline</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">Intermediate to Advanced</span>
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

      <Footer />
    </div>
  )
}

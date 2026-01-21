import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Briefcase, TrendingUp, Users, Target, Zap } from "lucide-react"

export default function CollegeToCorporatePage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">College to Corporate</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Bridge the gap between academic learning and corporate success with our comprehensive transition program
            </p>
            <Button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-8 py-3 rounded-full text-lg font-medium">
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Overview</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our College to Corporate program is specifically designed to help fresh graduates and final-year students
              transition smoothly from academic life to professional corporate environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Academic Foundation</h3>
                <p className="text-gray-600">Build upon your academic knowledge with practical applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Briefcase className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Corporate Readiness</h3>
                <p className="text-gray-600">Develop essential skills for corporate success and leadership</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                <p className="text-gray-600">Fast-track your career with industry-relevant skills and mentorship</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Components</h2>
            <p className="text-lg text-gray-600">
              Comprehensive training modules designed for smooth corporate transition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Professional Skills</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Communication & Presentation</li>
                  <li>• Team Collaboration</li>
                  <li>• Time Management</li>
                  <li>• Problem-Solving Techniques</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Target className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Technical Excellence</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Industry-Standard Tools</li>
                  <li>• Project Management</li>
                  <li>• Quality Assurance</li>
                  <li>• Technical Documentation</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Zap className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Workplace Etiquette</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Corporate Culture Understanding</li>
                  <li>• Professional Networking</li>
                  <li>• Email & Meeting Etiquette</li>
                  <li>• Dress Code & Behavior</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Briefcase className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Interview Preparation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Resume Building</li>
                  <li>• Mock Interviews</li>
                  <li>• Technical Assessments</li>
                  <li>• Salary Negotiation</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Leadership Development</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Leadership Fundamentals</li>
                  <li>• Decision Making</li>
                  <li>• Conflict Resolution</li>
                  <li>• Emotional Intelligence</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <GraduationCap className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Industry Exposure</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Industry Guest Sessions</li>
                  <li>• Company Visits</li>
                  <li>• Real Project Experience</li>
                  <li>• Mentorship Programs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Path */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Success Path</h2>
            <p className="text-lg text-gray-600">
              A structured journey from college graduate to corporate professional
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Assessment</h3>
              <p className="text-gray-600">Evaluate current skills and identify development areas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Training</h3>
              <p className="text-gray-600">Intensive skill development and practical learning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Practice</h3>
              <p className="text-gray-600">Real-world projects and simulated work environments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Placement</h3>
              <p className="text-gray-600">Job placement assistance and career guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Should Join?</h2>
            <p className="text-lg text-gray-600">
              This program is perfect for students and graduates ready to excel in corporate environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Final Year Students</h3>
                <p className="text-gray-600 text-sm">Prepare for your career while completing your degree</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Fresh Graduates</h3>
                <p className="text-gray-600 text-sm">Bridge the gap between education and employment</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Career Changers</h3>
                <p className="text-gray-600 text-sm">Transition to corporate roles from other fields</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Skill Upgraders</h3>
                <p className="text-gray-600 text-sm">Enhance existing skills for better opportunities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your Corporate Career?</h2>
          <p className="text-xl text-white mb-8">
            Join thousands who successfully transitioned from college to corporate success
          </p>
          <Button className="bg-white text-[#FF6B35] hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium">
            Enroll Today
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

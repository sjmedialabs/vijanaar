import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Award, Target, Lightbulb, TrendingUp } from "lucide-react"

export default function FacultyDevelopmentPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Faculty Development Program</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Empowering educators with cutting-edge skills and modern teaching methodologies for the digital age
            </p>
            <Button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-8 py-3 rounded-full text-lg font-medium">
              Join Program
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
              Our Faculty Development Program is designed to enhance teaching capabilities, integrate technology in
              education, and prepare educators for the future of learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Modern Pedagogy</h3>
                <p className="text-gray-600">Learn innovative teaching methods and student engagement techniques</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Collaborative Learning</h3>
                <p className="text-gray-600">Network with fellow educators and share best practices</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Certification</h3>
                <p className="text-gray-600">Receive recognized certification for professional development</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Focus Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Focus Areas</h2>
            <p className="text-lg text-gray-600">
              Comprehensive development across multiple dimensions of teaching excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <Target className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Digital Teaching Tools</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Learning Management Systems</li>
                  <li>• Interactive Presentation Tools</li>
                  <li>• Virtual Classroom Management</li>
                  <li>• Assessment Technologies</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Lightbulb className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Innovative Methodologies</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Flipped Classroom Techniques</li>
                  <li>• Project-Based Learning</li>
                  <li>• Gamification in Education</li>
                  <li>• Blended Learning Approaches</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Student Engagement</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Active Learning Strategies</li>
                  <li>• Motivation Techniques</li>
                  <li>• Inclusive Teaching Practices</li>
                  <li>• Feedback Mechanisms</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <BookOpen className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Curriculum Development</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Course Design Principles</li>
                  <li>• Learning Outcome Mapping</li>
                  <li>• Content Structuring</li>
                  <li>• Industry Alignment</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Research & Development</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Educational Research Methods</li>
                  <li>• Data-Driven Teaching</li>
                  <li>• Publication Strategies</li>
                  <li>• Grant Writing</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Professional Growth</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Leadership Development</li>
                  <li>• Communication Skills</li>
                  <li>• Time Management</li>
                  <li>• Career Planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Benefits</h2>
            <p className="text-lg text-gray-600">
              Transform your teaching career with our comprehensive development program
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enhanced Teaching Skills</h3>
                  <p className="text-gray-600">
                    Develop modern teaching techniques that improve student learning outcomes and engagement.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Technology Integration</h3>
                  <p className="text-gray-600">
                    Master digital tools and platforms to create interactive and effective learning experiences.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Career Advancement</h3>
                  <p className="text-gray-600">
                    Gain credentials and skills that open doors to leadership positions and new opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional Network</h3>
                  <p className="text-gray-600">
                    Connect with educators from diverse backgrounds and build lasting professional relationships.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Research Opportunities</h3>
                  <p className="text-gray-600">
                    Develop research skills and contribute to educational innovation and best practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">6</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Continuous Support</h3>
                  <p className="text-gray-600">
                    Access ongoing mentorship and resources to support your professional development journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Teaching?</h2>
          <p className="text-xl text-white mb-8">
            Join our Faculty Development Program and become an educator of the future
          </p>
          <Button className="bg-white text-[#FF6B35] hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium">
            Apply Now
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

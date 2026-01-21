import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Users, Lightbulb, Target, TrendingUp, Shield } from "lucide-react"

export default function DataScienceForLeadersPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Data Science for Leaders</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Empower your leadership with data-driven decision making and strategic insights for the digital age
            </p>
            <Button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-8 py-3 rounded-full text-lg font-medium">
              Lead with Data
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
              Designed for executives, managers, and senior professionals who want to leverage data science for
              strategic advantage without becoming technical experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Strategic Insights</h3>
                <p className="text-gray-600">
                  Learn to extract actionable insights from complex data for strategic decisions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Team Leadership</h3>
                <p className="text-gray-600">
                  Effectively lead and communicate with data science teams and stakeholders
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Lightbulb className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation Drive</h3>
                <p className="text-gray-600">
                  Foster data-driven innovation and digital transformation in your organization
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Learning Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Learning Areas</h2>
            <p className="text-lg text-gray-600">
              Comprehensive curriculum tailored for leadership excellence in the data age
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <Target className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Data Strategy & Governance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Data Strategy Development</li>
                  <li>• Data Governance Frameworks</li>
                  <li>• Privacy & Compliance</li>
                  <li>• ROI Measurement</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <BarChart3 className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Business Intelligence</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• KPI Design & Monitoring</li>
                  <li>• Dashboard Interpretation</li>
                  <li>• Predictive Analytics</li>
                  <li>• Market Intelligence</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Team Management</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Data Team Structure</li>
                  <li>• Hiring Data Talent</li>
                  <li>• Performance Management</li>
                  <li>• Cross-functional Collaboration</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Lightbulb className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Innovation & Transformation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Digital Transformation</li>
                  <li>• AI Implementation Strategy</li>
                  <li>• Change Management</li>
                  <li>• Innovation Culture</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Risk & Ethics</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Data Security</li>
                  <li>• Ethical AI Practices</li>
                  <li>• Bias Detection</li>
                  <li>• Regulatory Compliance</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-[#FF6B35] mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-[#FF6B35]">Strategic Decision Making</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Data-Driven Decisions</li>
                  <li>• Scenario Planning</li>
                  <li>• Investment Prioritization</li>
                  <li>• Competitive Analysis</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Benefits</h2>
            <p className="text-lg text-gray-600">Transform your leadership approach with data-driven capabilities</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enhanced Decision Making</h3>
                  <p className="text-gray-600">
                    Make confident, data-backed decisions that drive business growth and competitive advantage.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Improved Team Communication</h3>
                  <p className="text-gray-600">
                    Bridge the gap between technical teams and business stakeholders with clear data communication.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Strategic Advantage</h3>
                  <p className="text-gray-600">
                    Identify market opportunities and optimize operations through advanced analytics and insights.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Innovation Leadership</h3>
                  <p className="text-gray-600">
                    Drive digital transformation and foster a culture of data-driven innovation in your organization.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Risk Mitigation</h3>
                  <p className="text-gray-600">
                    Identify and mitigate risks through predictive analytics and comprehensive data governance.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Operational Excellence</h3>
                  <p className="text-gray-600">
                    Optimize processes, reduce costs, and improve efficiency through data-driven operational insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Should Attend?</h2>
            <p className="text-lg text-gray-600">
              This program is designed for leaders who want to harness the power of data science
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">C-Suite Executives</h3>
                <p className="text-gray-600 text-sm">
                  CEOs, CTOs, and senior executives driving digital transformation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Department Heads</h3>
                <p className="text-gray-600 text-sm">Directors and VPs managing data-driven initiatives</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Business Analysts</h3>
                <p className="text-gray-600 text-sm">Senior analysts transitioning to leadership roles</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Consultants</h3>
                <p className="text-gray-600 text-sm">Management consultants advising on data strategy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Format */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Format</h2>
            <p className="text-lg text-gray-600">Flexible learning designed for busy executives</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">8</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Weeks Duration</h3>
                <p className="text-gray-600">Intensive yet manageable timeline for busy professionals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Hours Per Week</h3>
                <p className="text-gray-600">Flexible scheduling to accommodate executive calendars</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">15</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Max Participants</h3>
                <p className="text-gray-600">Small cohorts for personalized attention and networking</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FF6B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Lead with Data?</h2>
          <p className="text-xl text-white mb-8">
            Transform your leadership approach and drive organizational success through data science
          </p>
          <Button className="bg-white text-[#FF6B35] hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium">
            Reserve Your Spot
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

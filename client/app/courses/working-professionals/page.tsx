import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function WorkingProfessionalsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                AI ML Data Science Training for Working Professionals
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Upgrade Your Career Without Pressing Pause - Weekend & Evening Batches Available
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Weekend Batches</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">8 Months</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Flexible Schedule</p>
                    <p className="text-xs text-gray-600">₹1,75,000 + GST</p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Enroll Now</Button>
              </div>
            </div>

            {/* Enrollment Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Advance Your Career Today</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div>
                  <Label htmlFor="experience">Current Role</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Select your current role</option>
                    <option>Software Developer</option>
                    <option>Business Analyst</option>
                    <option>Project Manager</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Career Goals (Optional)</Label>
                  <Textarea id="message" placeholder="Tell us about your career goals" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Free Career Counseling</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Flexible Schedules</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Hybrid Learning</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Career Focused</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Real Projects</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Placement Support</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Career Gaps Support</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Upgrade Your Career Without Pressing Pause</h2>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-600 mb-6">
                  At Vijanaar, we understand the challenges working professionals face when it comes to upskilling—tight
                  schedules, work commitments, and lack of flexibility. That's why our Data Science Training for Working
                  Professionals in Hyderabad is designed to fit seamlessly into your professional life.
                </p>
                <p className="text-gray-600 mb-6">
                  With weekend batches, online live sessions, and real-time projects, we make sure you gain the
                  expertise you need without compromising on your career growth.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Vijanaar is the Right Choice for Working Professionals
              </h3>
              <ul className="space-y-3 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Flexible Schedules:</strong> Weekend & evening classes that suit your work routine.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Hybrid Learning Options:</strong> Join classroom sessions in Hyderabad or attend live online
                    classes from anywhere.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Career-Focused Curriculum:</strong> Tailored for professionals looking to transition into
                    Data Science, AI, or Analytics roles.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Learn by Doing:</strong> Practical case studies, domain-specific projects, and real-world
                    datasets.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Placement Assistance:</strong> Resume preparation, mock interviews, and connections with
                    hiring partners.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Support for Career Gaps:</strong> Ideal for professionals restarting their career after a
                    break.
                  </span>
                </li>
              </ul>

              {/* Curriculum */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Master</h3>
              <p className="text-gray-600 mb-6">
                Our program focuses on building job-ready skills for the modern workplace:
              </p>

              <div className="space-y-4 mb-12">
                {[
                  "Python Programming for Data Science",
                  "Advanced Statistics & Predictive Modeling",
                  "Machine Learning Algorithms",
                  "Deep Learning & AI Concepts",
                  "Big Data Tools (Hadoop, Spark)",
                  "SQL & Data Handling Techniques",
                  "Data Visualization (Tableau, Power BI)",
                  "Real-Time Projects for Business Use Cases",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Who Can Enroll?</h3>
              <p className="text-gray-600 mb-4">This program is designed for:</p>
              <ul className="space-y-2 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>IT professionals who want to shift into Data Science & AI roles.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Non-IT professionals (finance, HR, marketing, operations) looking to switch careers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Managers & team leaders who want to leverage Data Science for decision-making.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Professionals returning to the workforce after a career break.</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Growth After Training</h3>
              <p className="text-gray-600 mb-4">
                The demand for Data Science and AI specialists is booming across industries like IT, healthcare,
                finance, e-commerce, and consulting. After completing Vijanaar's program, you can pursue roles such as:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Data Scientist",
                  "Business Analyst",
                  "Machine Learning Engineer",
                  "AI Engineer",
                  "Data Engineer",
                  "Analytics Consultant",
                ].map((role, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Course Highlights</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">8 Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Schedule:</span>
                      <span className="font-medium">Weekends</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mode:</span>
                      <span className="font-medium">Hybrid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projects:</span>
                      <span className="font-medium">6+ Business Cases</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Support:</span>
                      <span className="font-medium">Career Transition</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Download Brochure</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Schedule a Call</h4>
                  <form className="space-y-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" />
                    <Input placeholder="Your Phone" />
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Preferred Time</option>
                      <option>Morning (9-12 PM)</option>
                      <option>Afternoon (12-6 PM)</option>
                      <option>Evening (6-9 PM)</option>
                    </select>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Call</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

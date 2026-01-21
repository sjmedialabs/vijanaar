import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CollegeToCorporatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                College to Corporate – Data Science Scholars Program
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your Gateway from Campus to Career - Bridge the gap between academic knowledge and industry demands
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
                  <span className="text-sm font-medium">For Students & Freshers</span>
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
                  <span className="text-sm font-medium">5 Months</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Campus to Career</p>
                    <p className="text-xs text-gray-600">₹99,000 + GST</p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Enroll Now</Button>
              </div>
            </div>

            {/* Enrollment Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Start Your Corporate Journey</h3>
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
                  <Label htmlFor="education">Education Background</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Select your background</option>
                    <option>B.Tech/B.E</option>
                    <option>B.Sc</option>
                    <option>B.Com</option>
                    <option>MCA</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="year">Year of Study/Graduation</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Select year</option>
                    <option>Final Year</option>
                    <option>2024 Graduate</option>
                    <option>2023 Graduate</option>
                    <option>Other</option>
                  </select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Free Career Guidance</Button>
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
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Designed for Freshers</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Industry-Centric</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Practical Exposure</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Career Support</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Skill Transformation</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Soft Skills Training</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Gateway from Campus to Career</h2>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-600 mb-6">
                  At Vijanaar, we bridge the gap between academic knowledge and real-world industry demands. Our College
                  to Corporate – Data Science Scholars Program is specially designed for students, fresh graduates, and
                  young aspirants who want to secure a strong footing in the corporate world.
                </p>
                <p className="text-gray-600 mb-6">
                  This program helps you move seamlessly from college to a professional career with hands-on Data
                  Science training, industry projects, and career support.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Vijanaar's College to Corporate Program?
              </h3>
              <ul className="space-y-3 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Designed for Freshers:</strong> Tailored for graduates and students in their final year.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Industry-Centric Curriculum:</strong> Learn tools and techniques used in top companies.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Practical Exposure:</strong> Work on real-time projects that strengthen your resume.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Career Support:</strong> Resume preparation, interview guidance, and placement assistance.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Skill Transformation:</strong> From basic coding to advanced analytics, we prepare you for
                    the corporate environment.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Soft Skills Training:</strong> Enhance communication, teamwork, and corporate readiness.
                  </span>
                </li>
              </ul>

              {/* Curriculum */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h3>
              <p className="text-gray-600 mb-6">
                Our curriculum takes you from foundations to advanced concepts, ensuring you're job-ready:
              </p>

              <div className="space-y-4 mb-12">
                {[
                  "Python Programming (beginner to advanced)",
                  "Statistics & Probability for Data Analysis",
                  "Data Handling (Excel, SQL, NoSQL)",
                  "Machine Learning & AI Concepts",
                  "Deep Learning & Neural Networks",
                  "Natural Language Processing (NLP)",
                  "Big Data Tools (Hadoop, Spark)",
                  "Data Visualization (Power BI, Tableau)",
                  "Live Corporate Projects",
                  "Communication & Career Readiness",
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
              <p className="text-gray-600 mb-4">This program is ideal for:</p>
              <ul className="space-y-2 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Final-year students preparing for placements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Fresh graduates from B.Sc, B.Com, MCA, B.Tech, M.Tech, and similar backgrounds.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Non-IT aspirants wanting to step into Data Science roles.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Young professionals looking for structured entry into IT and analytics.</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Opportunities</h3>
              <p className="text-gray-600 mb-4">
                After successful completion, students are prepared for roles such as:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Junior Data Scientist",
                  "Data Analyst",
                  "Business Analyst",
                  "Machine Learning Engineer",
                  "AI & Data Associate",
                  "Research & Analytics Executive",
                ].map((role, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium">{role}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Start Early with Vijanaar?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Kickstart your career while your peers are still exploring options.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Gain real-time industry experience before stepping into the corporate world.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Build a professional portfolio with projects, certifications, and job-ready skills.</span>
                </li>
              </ul>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Program Highlights</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">5 Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium">Students & Freshers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projects:</span>
                      <span className="font-medium">4+ Live Projects</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Placement:</span>
                      <span className="font-medium">100% Support</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Skills:</span>
                      <span className="font-medium">Technical + Soft</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Download Program Guide</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Campus Connect</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Special programs for college partnerships and bulk enrollments.
                  </p>
                  <form className="space-y-4">
                    <Input placeholder="College Name" />
                    <Input placeholder="Contact Person" />
                    <Input placeholder="Email" />
                    <Input placeholder="Phone" />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Connect with Us</Button>
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

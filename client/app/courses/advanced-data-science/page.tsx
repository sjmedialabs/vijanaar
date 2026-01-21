import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdvancedDataSciencePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Data Science & AI Masters 2025 - From Python To Gen AI
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Master Data Science and AI Learn Python, SQL, Stats, ML, Machine Learning, NLP, Deep Learning and Gen AI
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
                  <span className="text-sm font-medium">Next Batch: 25th Oct 2025</span>
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
                  <span className="text-sm font-medium">6 Months</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Trainer</p>
                    <p className="text-xs text-gray-600">₹1,50,000 + GST</p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Enroll Now</Button>
              </div>
            </div>

            {/* Enrollment Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Start your Data Science Adventure</h3>
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
                  <Label htmlFor="experience">Experience Level</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Select your experience</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea id="message" placeholder="Tell us about your goals" />
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
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Industry Curriculum</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Expert Mentors</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Hands-on Projects</h4>
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
              <h4 className="font-semibold text-sm">Job Assistance</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Flexible Timing</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Certification</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Transform Your Career with Advanced Data Science
              </h2>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-600 mb-6">
                  At Vijanaar, we believe that Data Science is more than just a skill—it's the future of
                  decision-making, business innovation, and career growth. Our Advanced Data Science Training in
                  Hyderabad is designed to empower students, working professionals, and career changers with the
                  knowledge and tools needed to thrive in this fast-growing field.
                </p>
                <p className="text-gray-600 mb-6">
                  Whether you're from a technical or non-technical background, Vijanaar makes it possible to transition
                  smoothly into a rewarding Data Science career.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Vijanaar for Data Science Training?</h3>
              <ul className="space-y-3 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Industry-Curated Curriculum:</strong> Modules designed to match the latest industry needs.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Hands-On Learning:</strong> Work on real-time projects and case studies to gain practical
                    exposure.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Expert Faculty:</strong> Trainers with proven experience in Data Science and Machine
                    Learning.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Career Support:</strong> Placement guidance, resume building, and interview preparation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Flexible Learning:</strong> Classroom and online training options to suit your schedule.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Beginner-Friendly:</strong> Even if you come from B.Sc, B.Com, MCA, or other non-IT
                    backgrounds, our step-by-step training helps you build confidence.
                  </span>
                </li>
              </ul>

              {/* Curriculum */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h3>
              <p className="text-gray-600 mb-6">
                Our Advanced Data Science course covers the full spectrum of data-driven technologies and techniques:
              </p>

              <div className="space-y-4 mb-12">
                {[
                  "Python for Data Science",
                  "Statistics & Probability for Data Analysis",
                  "Machine Learning (Supervised & Unsupervised)",
                  "Deep Learning & Neural Networks",
                  "Natural Language Processing (NLP)",
                  "Artificial Intelligence Applications",
                  "Big Data Analytics with Hadoop & Spark",
                  "SQL & NoSQL Databases",
                  "Data Visualization (Tableau, Power BI)",
                  "Real-Time Industry Projects",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Who Can Join?</h3>
              <p className="text-gray-600 mb-4">This course is ideal for:</p>
              <ul className="space-y-2 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Students & fresh graduates looking to build a career in Data Science.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Working professionals seeking career advancement or transition.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    Non-IT aspirants from commerce, life sciences, or business backgrounds wanting to enter IT.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Anyone passionate about Data, AI, and future technologies.</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Opportunities After Training</h3>
              <p className="text-gray-600 mb-4">
                With Data Science being one of the most in-demand skills globally, Vijanaar ensures you are prepared for
                roles such as:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Data Scientist",
                  "Machine Learning Engineer",
                  "Data Analyst",
                  "AI Engineer",
                  "Business Intelligence Specialist",
                  "Data Engineer",
                ].map((role, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium">{role}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600">
                Our dedicated placement team will guide you until you land your dream job.
              </p>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Course Highlights</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">6 Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mode:</span>
                      <span className="font-medium">Online/Offline</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Batch Size:</span>
                      <span className="font-medium">15-20 Students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projects:</span>
                      <span className="font-medium">5+ Real-time</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certification:</span>
                      <span className="font-medium">Industry Recognized</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Download Syllabus</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Get Free Demo Class</h4>
                  <form className="space-y-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" />
                    <Input placeholder="Your Phone" />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Free Demo</Button>
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

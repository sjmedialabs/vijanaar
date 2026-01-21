import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FacultyDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                AI & ML Faculty Development Program (FDP)
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Empowering Educators for the Future of Learning - Bridge the gap between academic teaching and industry
                practices
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
                  <span className="text-sm font-medium">For Faculty Members</span>
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
                  <span className="text-sm font-medium">5-10 Days</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Customizable Program</p>
                    <p className="text-xs text-gray-600">Contact for Pricing</p>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Request Program</Button>
              </div>
            </div>

            {/* Enrollment Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Request FDP for Your Institution</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Faculty Name</Label>
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
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input id="institution" placeholder="Enter your institution name" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Select your department</option>
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Electronics & Communication</option>
                    <option>Other Engineering</option>
                    <option>Management</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="participants">Expected Participants</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Select number of participants</option>
                    <option>10-20 Faculty</option>
                    <option>20-30 Faculty</option>
                    <option>30-50 Faculty</option>
                    <option>50+ Faculty</option>
                  </select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Request Custom FDP</Button>
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
              <h4 className="font-semibold text-sm">Expert Trainers</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Research-Oriented</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Practical Learning</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Customizable Modules</h4>
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
              <h4 className="font-semibold text-sm">Certification</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-sm">Blended Delivery</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Empowering Educators for the Future of Learning</h2>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-600 mb-6">
                  Artificial Intelligence (AI) and Machine Learning (ML) are transforming industries, research, and the
                  way we live. To prepare the next generation of innovators, faculty members must stay ahead with the
                  latest tools, techniques, and teaching methodologies.
                </p>
                <p className="text-gray-600 mb-6">
                  At Vijanaar, we offer a specialized AI & ML Faculty Development Program (FDP) designed to enhance the
                  knowledge, teaching ability, and research skills of educators in technical and non-technical domains.
                  This program bridges the gap between academic teaching and industry practices, ensuring faculty
                  members can guide students effectively in today's competitive world.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Objectives</h3>
              <ul className="space-y-3 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>To provide comprehensive knowledge of AI and Machine Learning concepts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>To equip faculty with hands-on exposure to tools and frameworks used in industry.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>To enable faculty to integrate AI & ML applications into classroom teaching.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>To foster a research-oriented mindset and encourage projects/publications.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>To prepare educators to mentor students in real-world AI/ML use cases.</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Vijanaar FDP?</h3>
              <ul className="space-y-3 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Expert Trainers:</strong> Sessions by AI & ML professionals with academic + industry
                    experience.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Research-Oriented:</strong> Guidance on publishing papers, patents, and applied projects.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Practical Learning:</strong> Hands-on labs using Python, TensorFlow, Keras, PyTorch,
                    Scikit-Learn, etc.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Customizable Modules:</strong> Programs tailored to departmental requirements.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Certification:</strong> FDP certificate recognized by industry and academia.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Blended Delivery:</strong> Available in offline, online, or hybrid mode for maximum
                    flexibility.
                  </span>
                </li>
              </ul>

              {/* Key Modules */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Modules Covered</h3>

              <div className="space-y-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    1. Foundations of Artificial Intelligence & Machine Learning
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Introduction to AI & ML</li>
                    <li>• Supervised vs. Unsupervised Learning</li>
                    <li>• Neural Networks Basics</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">2. Mathematics & Statistics for ML</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Linear Algebra, Probability & Statistics</li>
                    <li>• Optimization & Gradient Descent</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">3. Programming Essentials</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Python for Data Science</li>
                    <li>• Libraries: NumPy, Pandas, Matplotlib, Scikit-Learn</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">4. Machine Learning Algorithms</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Regression, Classification, Clustering</li>
                    <li>• Decision Trees, Random Forests, SVM, KNN</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">5. Deep Learning & Neural Networks</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Introduction to ANN, CNN, RNN, LSTM</li>
                    <li>• Natural Language Processing (NLP)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">6. AI Applications</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Computer Vision, Speech Recognition, Chatbots</li>
                    <li>• AI in Healthcare, Finance, Education, and IoT</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">7. Research & Teaching Integration</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• How to introduce AI/ML concepts in curriculum</li>
                    <li>• Designing lab experiments & student projects</li>
                    <li>• Publication opportunities in AI/ML</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Who Can Enroll?</h3>
              <ul className="space-y-2 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    Faculty members from Computer Science, IT, ECE, EEE, Mechanical, Civil, and related fields.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>
                    Educators from management, commerce, and life sciences aiming to integrate AI/ML in research.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Academic leaders, HoDs, and coordinators planning to revamp AI/ML curriculum.</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Enhanced technical competency in AI & ML",
                  "Ability to design and deliver advanced coursework",
                  "Strengthened research and publication opportunities",
                  "Networking with industry experts and academic peers",
                  "Certificate of Completion for career progression",
                  "NAAC/NBA accreditation support",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Program Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">5-10 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mode:</span>
                      <span className="font-medium">Hybrid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-medium">Lectures + Labs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certification:</span>
                      <span className="font-medium">Industry Recognized</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customization:</span>
                      <span className="font-medium">Available</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Download FDP Brochure</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Institutional Benefits</h4>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li>• Curriculum upgrade support</li>
                    <li>• NAAC/NBA/AICTE accreditation</li>
                    <li>• Industry-linked projects</li>
                    <li>• Enhanced placement opportunities</li>
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Institution Visit</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

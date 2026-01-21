// "use client"

// import { useState } from "react"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export default function AIMLDataSciencePage() {
//   const [expandedModule, setExpandedModule] = useState<number | null>(null)
//   const [activeTab, setActiveTab] = useState("Online Training")
//   const [showVideoPopup, setShowVideoPopup] = useState(false)

//   const toggleModule = (moduleIndex: number) => {
//     setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex)
//   }

//   const modules = [
//     {
//       title: "Module 1: Python Data Language",
//       topics: [
//         "Python Basics & Syntax",
//         "Data Types and Variables",
//         "Control Structures",
//         "Functions and Modules",
//         "File Handling and Exception Handling",
//       ],
//     },
//     {
//       title: "Module 2: Data Analysis using Python",
//       topics: [
//         "NumPy for Numerical Computing",
//         "Pandas for Data Manipulation",
//         "Data Cleaning and Preprocessing",
//         "Exploratory Data Analysis",
//         "Statistical Analysis with Python",
//       ],
//     },
//     {
//       title: "Module 3: Data Visualization",
//       topics: [
//         "Matplotlib for Basic Plotting",
//         "Seaborn for Statistical Visualization",
//         "Plotly for Interactive Charts",
//         "Dashboard Creation",
//         "Advanced Visualization Techniques",
//       ],
//     },
//     {
//       title: "Module 4: Machine Learning - Supervised and Unsupervised Learning",
//       topics: [
//         "Introduction to Machine Learning",
//         "Supervised Learning Algorithms",
//         "Unsupervised Learning Techniques",
//         "Model Selection and Evaluation",
//         "Cross-validation and Hyperparameter Tuning",
//       ],
//     },
//     {
//       title: "Module 5: Machine Learning - Supervised and Unsupervised Learning",
//       topics: [
//         "Advanced ML Algorithms",
//         "Ensemble Methods",
//         "Feature Engineering",
//         "Model Deployment",
//         "MLOps and Production Systems",
//       ],
//     },
//     {
//       title: "Module 6: Deep Learning",
//       topics: [
//         "Neural Network Fundamentals",
//         "TensorFlow and Keras",
//         "Convolutional Neural Networks",
//         "Recurrent Neural Networks",
//         "Transfer Learning and Fine-tuning",
//       ],
//     },
//     {
//       title: "Module 7: Natural Language Processing",
//       topics: [
//         "Text Preprocessing",
//         "Sentiment Analysis",
//         "Named Entity Recognition",
//         "Topic Modeling",
//         "Transformer Models and BERT",
//       ],
//     },
//     {
//       title: "Module 8: Generative AI",
//       topics: [
//         "Introduction to Generative AI",
//         "Large Language Models",
//         "Prompt Engineering",
//         "Fine-tuning LLMs",
//         "Building AI Applications",
//       ],
//     },
//   ]

//   const trainingTabs = ["Online Training", "Self-Pace Training", "Classroom Training", "Corporate Training"]

//   return (
//     <main className="min-h-screen bg-white">
//       <Header />

//       <section
//         className="relative py-16 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url(${course.bannerSection.backgroundImageUrl})`
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-7 gap-4 items-center">
//             {/* Left Content */}
//             <div className="lg:col-span-3">
//               <h1
//                 className="font-bold mb-6 leading-tight"
//                 style={{
//                   color: "#27AAE1",
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 700,
//                   fontSize: "42px",
//                 }}
//               >
//                 {course.bannerSection.courseName}
//               </h1>
//               <p
//                 className="mb-8 leading-relaxed"
//                 style={{
//                   color: "#000",
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 700,
//                   fontSize: "22px",
//                 }}
//               >
//                 {course.bannerSection.subTitle}
//               </p>

//               {/* Course Stats */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div className="flex items-center gap-3">
//                   <img src="/images/solar-calendar-outline.png" alt="Calendar" className="w-8 h-8" />
//                   <div>
//                     <p className="text-lg font-semibold text-gray-900">Programme Starts</p>
//                     <p className="text-lg font-bold text-gray-900">{course.bannerSection.startDate}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <img src="/images/mingcute-time-duration-line.png" alt="Duration" className="w-8 h-8" />
//                   <div>
//                     <p className="text-lg font-semibold text-gray-900">Duration</p>
//                     <p className="text-lg font-bold text-gray-900">{course.bannerSection.duration}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <img src="/images/ri-money-rupee-circle-fill.png" alt="Fees" className="w-8 h-8" />
//                   <div>
//                     <p className="text-lg font-semibold text-gray-900">Programme Fees</p>
//                     <p className="text-lg font-bold text-gray-900">₹{course.bannerSection.courseFee} + GST</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg font-medium rounded-lg flex items-center gap-2">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     Download Brochuer
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Right Image */}
//             <div className="relative lg:col-span-4">
//               <img
//                 src={course.bannerSection.imageUrl}
//                 alt={course.bannerSection.courseName}
//                 className="w-full h-auto max-w-none scale-130"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Course Highlights */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
//             <div className="text-center p-6 rounded-[20px]" style={{ backgroundColor: "#E7EAF3" }}>
//               <img
//                 src="/images/healthicons-award-trophy-outline.png"
//                 alt="Award Trophy"
//                 className="w-12 h-12 mx-auto mb-4"
//               />
//               <p
//                 className="text-center"
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px", // Updated font size from 14px to 12px
//                 }}
//               >
//                 Awarded by "Times Group"
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-[20px]" style={{ backgroundColor: "#E7EAF3" }}>
//               <img src="/images/uil-react.png" alt="React Training" className="w-12 h-12 mx-auto mb-4" />
//               <p
//                 className="text-center"
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px", // Updated font size from 14px to 12px
//                 }}
//               >
//                 Practical Training & Live Projects
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-[20px]" style={{ backgroundColor: "#E7EAF3" }}>
//               <img
//                 src="/images/streamline-ultimate-team-meeting.png"
//                 alt="Team Meeting"
//                 className="w-12 h-12 mx-auto mb-4"
//               />
//               <p
//                 className="text-center"
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px", // Updated font size from 14px to 12px
//                 }}
//               >
//                 Free Workshops Throughout the year
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-[20px]" style={{ backgroundColor: "#E7EAF3" }}>
//               <img
//                 src="/images/ph-chalkboard-teacher-light.png"
//                 alt="Chalkboard Teacher"
//                 className="w-12 h-12 mx-auto mb-4"
//               />
//               <p
//                 className="text-center"
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px", // Updated font size from 14px to 12px
//                 }}
//               >
//                 24/7 Flexible Mentoring by Experts
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-[20px]" style={{ backgroundColor: "#E7EAF3" }}>
//               <img src="/images/hugeicons-access.png" alt="Access Key" className="w-12 h-12 mx-auto mb-4" />
//               <p
//                 className="text-center"
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px", // Updated font size from 14px to 12px
//                 }}
//               >
//                 Lifetime LMS access.
//               </p>
//             </div>

//             <div className="text-center p-6 rounded-[20px]" style={{ backgroundColor: "#E7EAF3" }}>
//               <img
//                 src="/images/streamline-ultimate-job-responsibility-bag-hand.png"
//                 alt="Job Responsibility"
//                 className="w-12 h-12 mx-auto mb-4"
//               />
//               <p
//                 className="text-center"
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px", // Updated font size from 14px to 12px
//                 }}
//               >
//                 100% Placement Assistance
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-3 gap-12">
//             {/* Left Content */}
//             <div className="lg:col-span-2">
//               {/* Course Description */}
//             <div className="mb-12">
//             <h2
//               className="mb-6"
//               style={{
//                 fontFamily: "Poppins, sans-serif",
//                 fontWeight: 500,
//                 fontSize: "20px",
//                 color: "#27AAE1",
//               }}
//             >
//               {course.sectionTwo.title}
//             </h2>
//             <p
//               className="mb-4 leading-relaxed"
//               style={{
//                 color: "#656565",
//                 fontFamily: "Poppins, sans-serif",
//                 fontWeight: 400,
//                 fontSize: "12px",
//               }}
//             >
//               {course.sectionTwo.description1}
//             </p>
//             <p
//               className="mb-6 leading-relaxed"
//               style={{
//                 color: "#656565",
//                 fontFamily: "Poppins, sans-serif",
//                 fontWeight: 400,
//                 fontSize: "12px",
//               }}
//             >
//               {course.sectionTwo.description2}
//             </p>
//           </div>


//               {/* Curriculum */}
//               <div className="mb-12">
//                 <h3
//                   className="mb-6"
//                   style={{
//                     fontFamily: "Poppins, sans-serif",
//                     fontWeight: 500,
//                     fontSize: "20px",
//                     color: "#50BAE7",
//                   }}
//                 >
//                   Course Curriculum
//                 </h3>
//                 <div className="space-y-4">
//                   {course.curriculum.map((module, index) => (
//                     <Card key={index} className="border border-gray-200">
//                       <CardContent className="p-0">
//                         <button
//                           onClick={() => toggleModule(index)}
//                           className="w-full text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
//                           style={{ padding: "10px" }}
//                         >
//                           <span className="font-medium text-gray-900">{module.title}</span>
//                           <svg
//                             className={`w-5 h-5 text-gray-500 transition-transform ${
//                               expandedModule === index ? "rotate-180" : ""
//                             }`}
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                         {expandedModule === index && (
//                           <div className="border-t border-gray-100" style={{ padding: "10px" }}>
//                             <ul className="space-y-2 mt-2.5">
//                               {module.topics.map((point, idx) => (
//                                 <li key={idx} className="flex items-start gap-2">
//                                   <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
//                                   <span className="text-gray-600 text-sm">{point.description}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>

              
//                 {/* Technology Stack */}
//                 <div className="mb-12">
//                   <h3
//                     className="mb-6"
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 500,
//                       fontSize: "20px",
//                       color: "#27AAE1",
//                     }}
//                   >
//                     {course.toolsSection.title}
//                   </h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     {course.toolsSection.tools.map((tool, index) => (
//                       <div
//                         key={index}
//                         className="text-center p-4 border border-solid rounded-lg"
//                         style={{ borderColor: "#EAEAEA", padding: "15px" }}
//                       >
//                         <img src={tool.imageUrl} alt={tool.description} className="w-12 h-12 mx-auto mb-3" />
//                         <span
//                           className="text-center block"
//                           style={{
//                             fontFamily: "Poppins, sans-serif",
//                             fontWeight: 400,
//                             fontSize: "12px",
//                             color: "#656565",
//                           }}
//                         >
//                           {tool.description}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               {/* Training Options Section */}
//               <div className="mb-12">
//                 <h3
//                   className="mb-6"
//                   style={{
//                     fontFamily: "Poppins, sans-serif",
//                     fontWeight: 500,
//                     fontSize: "20px",
//                     color: "#27AAE1",
//                   }}
//                 >
//                   Training Options
//                 </h3>

//                 <Card className="border border-gray-200">
//                   <CardContent className="p-6">
//                     {/* Tabs */}
//                     <div className="flex flex-wrap gap-8 mb-6 border-b border-gray-200">
//                       {["Online Training", "Self-Paced Training", "Classroom Training", "Corporate Training"].map(
//                         (tab) => (
//                           <button
//                             key={tab}
//                             onClick={() => setActiveTab(tab)}
//                             className={`pb-3 border-b-2 transition-colors ${
//                               activeTab === tab ? "border-blue-400" : "border-transparent"
//                             }`}
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "14px",
//                               color: activeTab === tab ? "#42B5E5" : "#000",
//                             }}
//                           >
//                             {tab}
//                           </button>
//                         )
//                       )}
//                     </div>

//                     {/* Tab Content */}
//                     <div className="space-y-4">
//                       {activeTab === "Online Training" && (
//                         <>
//                           <p
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               color: "#000",
//                               lineHeight: "1.6",
//                             }}
//                           >
//                             {course.onlineTraining.description1}
//                           </p>
//                           <p
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               color: "#000",
//                               lineHeight: "1.6",
//                             }}
//                           >
//                             {course.onlineTraining.description2}
//                           </p>
//                         </>
//                       )}

//                       {activeTab === "Self-Paced Training" && (
//                         <>
//                           <p
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               color: "#000",
//                               lineHeight: "1.6",
//                             }}
//                           >
//                             {course.SelfplaceTraining.description1}
//                           </p>
//                           <p
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               color: "#000",
//                               lineHeight: "1.6",
//                             }}
//                           >
//                             {course.SelfplaceTraining.description2}
//                           </p>
//                         </>
//                       )}

//                       {activeTab === "Classroom Training" && (
//                         <>
//                           <p
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               color: "#000",
//                               lineHeight: "1.6",
//                             }}
//                           >
//                             {course.classroomTraining.description1}
//                           </p>
//                           <p
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               color: "#000",
//                               lineHeight: "1.6",
//                             }}
//                           >
//                             {course.classroomTraining.description2}
//                           </p>
//                         </>
//                       )}

//                       {activeTab === "Corporate Training" && (
//                         <>
//                           <p
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               color: "#000",
//                               lineHeight: "1.6",
//                             }}
//                           >
//                             {course.CorporateTraining.description1}
//                           </p>
//                           <p
//                             style={{
//                               fontFamily: "Poppins, sans-serif",
//                               fontWeight: 400,
//                               fontSize: "12px",
//                               color: "#000",
//                               lineHeight: "1.6",
//                             }}
//                           >
//                             {course.CorporateTraining.description2}
//                           </p>
//                         </>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Advantages Section */}
//               <div className="mb-12">
//                 <h3
//                   className="mb-6"
//                   style={{
//                     fontFamily: "Poppins, sans-serif",
//                     fontWeight: 500,
//                     fontSize: "20px",
//                     color: "#27AAE1",
//                   }}
//                 >
//                   {course.advantagesSection.title}
//                 </h3>

//                 <div className="space-y-4">
//                   {course.advantagesSection.advantages.map((advantage, index) => (
//                     <div key={index} className="flex items-start gap-3">
//                       <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <svg
//                           className="w-4 h-4 text-blue-500"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                       <p
//                         style={{
//                           fontFamily: "Poppins, sans-serif",
//                           fontWeight: 400,
//                           fontSize: "12px",
//                           color: "#000",
//                           lineHeight: "1.6",
//                         }}
//                       >
//                         {advantage.description}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             {/* Right Sidebar */}
//             <div className="lg:col-span-1">
//               <Card className="sticky top-8">
//                 <CardContent className="p-6">
//                   <h3
//                     className="mb-6"
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 500,
//                       fontSize: "20px",
//                       color: "#50BAE7",
//                     }}
//                   >
//                     Request More Information
//                   </h3>
//                   <form className="space-y-4">
//                     <div>
//                       <Label htmlFor="name" className="text-sm font-medium text-gray-700">
//                         Full Name
//                       </Label>
//                       <Input id="name" placeholder="Enter your full name" className="mt-1" />
//                     </div>
//                     <div>
//                       <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//                         Email
//                       </Label>
//                       <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
//                     </div>
//                     <div>
//                       <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
//                         Phone Number
//                       </Label>
//                       <Input id="phone" placeholder="Enter your phone number" className="mt-1" />
//                     </div>
//                     <div>
//                       <Label htmlFor="qualification" className="text-sm font-medium text-gray-700">
//                         Qualification
//                       </Label>
//                       <Input id="qualification" placeholder="Your highest qualification" className="mt-1" />
//                     </div>
//                     <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Submit Enquiry</Button>
//                   </form>

//                   <div className="mt-8 pt-6 border-t border-gray-200">
//                     <h4 className="font-semibold text-gray-900 mb-4">Join our next Batch starting - 25th Aug</h4>
//                     <div className="space-y-3 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Duration:</span>
//                         <span className="font-medium">6 Months</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Mode:</span>
//                         <span className="font-medium">Online/Offline</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Batch Size:</span>
//                         <span className="font-medium">Max 20</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Fee:</span>
//                         <span className="font-medium text-orange-600">₹25,000</span>
//                       </div>
//                     </div>
//                     <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">Book Your Seat Now</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//         </div>
//       </section>

//       {/* Video Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="relative cursor-pointer" onClick={() => setShowVideoPopup(true)}>
//             <img
//               src="/images/video-thumbnail.png"
//               alt="Data Science Full Course 2025"
//               className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Who Can Enroll Section */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-12">
//             <h3
//               className="mb-8"
//               style={{
//                 fontFamily: "Poppins, sans-serif",
//                 fontWeight: 500,
//                 fontSize: "20px",
//                 color: "#27AAE1",
//               }}
//             >
//               Who can enroll This Course
//             </h3>
//             <p
//               className="mb-8"
//               style={{
//                 fontFamily: "Poppins, sans-serif",
//                 fontWeight: 400,
//                 fontSize: "12px",
//                 color: "#000",
//                 lineHeight: "1.6",
//               }}
//             >
//               This Data Science Course is specifically ideal for people who are
//             </p>

//             <div className="space-y-6">
//               <div className="flex items-start gap-4">
//                 <div
//                   className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: "#27AAE1" }}
//                 >
//                   <img src="/images/worker-career.png" alt="Career" className="w-8 h-8" />
//                 </div>
//                 <div className="flex-1">
//                   <p
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "12px",
//                       color: "#000",
//                       lineHeight: "1.6",
//                     }}
//                   >
//                     Freshers who want to start a career, as we teach from the basics and gradually build up your skills.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div
//                   className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: "#27AAE1" }}
//                 >
//                   <img src="/images/student-head.png" alt="Student" className="w-8 h-8" />
//                 </div>
//                 <div className="flex-1">
//                   <p
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "12px",
//                       color: "#000",
//                       lineHeight: "1.6",
//                     }}
//                   >
//                     Individuals who are graduated and working in the Data Science technology field and looking to
//                     upgrade their careers.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div
//                   className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: "#27AAE1" }}
//                 >
//                   <img src="/images/growth.png" alt="Growth" className="w-8 h-8" />
//                 </div>
//                 <div className="flex-1">
//                   <p
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "12px",
//                       color: "#000",
//                       lineHeight: "1.6",
//                     }}
//                   >
//                     Analysts and Software engineers looking for a career shift in the data science stream.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Job Opportunities Section */}
//           <div className="mb-12">
//             <h3
//               className="mb-8"
//               style={{
//                 fontFamily: "Poppins, sans-serif",
//                 fontWeight: 500,
//                 fontSize: "20px",
//                 color: "#27AAE1",
//               }}
//             >
//               Job opportunities in Data Science
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Business Intelligence Developer - Orange/Red Gradient */}
//               <div
//                 className="relative p-4 rounded-lg text-center"
//                 style={{
//                   background: "linear-gradient(135deg, #FF6B35, #F7931E)",
//                   padding: "2px",
//                 }}
//               >
//                 <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
//                   <span
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "14px",
//                       color: "#000",
//                     }}
//                   >
//                     Business Intelligence Developer
//                   </span>
//                 </div>
//               </div>

//               {/* Data Scientist - Blue Gradient */}
//               <div
//                 className="relative p-4 rounded-lg text-center"
//                 style={{
//                   background: "linear-gradient(135deg, #4A90E2, #357ABD)",
//                   padding: "2px",
//                 }}
//               >
//                 <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
//                   <span
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "14px",
//                       color: "#000",
//                     }}
//                   >
//                     Data Scientist
//                   </span>
//                 </div>
//               </div>

//               {/* Data Analyst - Gray/Silver Gradient */}
//               <div
//                 className="relative p-4 rounded-lg text-center"
//                 style={{
//                   background: "linear-gradient(135deg, #B8B8B8, #8E8E8E)",
//                   padding: "2px",
//                 }}
//               >
//                 <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
//                   <span
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "14px",
//                       color: "#000",
//                     }}
//                   >
//                     Data Analyst
//                   </span>
//                 </div>
//               </div>

//               {/* Data Engineer - Pink/Magenta Gradient */}
//               <div
//                 className="relative p-4 rounded-lg text-center"
//                 style={{
//                   background: "linear-gradient(135deg, #E91E63, #C2185B)",
//                   padding: "2px",
//                 }}
//               >
//                 <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
//                   <span
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "14px",
//                       color: "#000",
//                     }}
//                   >
//                     Data Engineer
//                   </span>
//                 </div>
//               </div>

//               {/* Business Intelligence Developer - Pink/Purple Gradient */}
//               <div
//                 className="relative p-4 rounded-lg text-center"
//                 style={{
//                   background: "linear-gradient(135deg, #9C27B0, #673AB7)",
//                   padding: "2px",
//                 }}
//               >
//                 <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
//                   <span
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "14px",
//                       color: "#000",
//                     }}
//                   >
//                     Business Intelligence Developer
//                   </span>
//                 </div>
//               </div>

//               {/* Data Architect - Blue to Green Gradient */}
//               <div
//                 className="relative p-4 rounded-lg text-center"
//                 style={{
//                   background: "linear-gradient(135deg, #2196F3, #4CAF50)",
//                   padding: "2px",
//                 }}
//               >
//                 <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
//                   <span
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "14px",
//                       color: "#000",
//                     }}
//                   >
//                     Data Architect
//                   </span>
//                 </div>
//               </div>

//               {/* Applications Architect - Purple Gradient */}
//               <div
//                 className="relative p-4 rounded-lg text-center"
//                 style={{
//                   background: "linear-gradient(135deg, #673AB7, #3F51B5)",
//                   padding: "2px",
//                 }}
//               >
//                 <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
//                   <span
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "14px",
//                       color: "#000",
//                     }}
//                   >
//                     Applications Architect
//                   </span>
//                 </div>
//               </div>

//               {/* Industry Architect - Orange to Blue Gradient */}
//               <div
//                 className="relative p-4 rounded-lg text-center"
//                 style={{
//                   background: "linear-gradient(135deg, #FF9800, #2196F3)",
//                   padding: "2px",
//                 }}
//               >
//                 <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
//                   <span
//                     style={{
//                       fontFamily: "Poppins, sans-serif",
//                       fontWeight: 400,
//                       fontSize: "14px",
//                       color: "#000",
//                     }}
//                   >
//                     Industry Architect
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Key Highlights Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2
//             className="text-center mb-12"
//             style={{
//               fontFamily: "Poppins, sans-serif",
//               fontWeight: 500,
//               fontSize: "20px",
//               color: "#27AAE1",
//             }}
//           >
//             Key Highlights of Online Data Science Program
//           </h2>

//           <div className="space-y-4">
//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 Learn from 500+ industry experts from Fortune 500 companies
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 24/7 access to a dedicated in-house data scientist team
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 200+ hours of practical, hands-on training
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 Flexible online sessions on weekdays and weekends
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 5+ ongoing batches with backup classes and LMS access
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 One-on-one mentorship and free technical support
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 Work on 30+ POCs and business-based use cases
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 Participate in meetups, hackathons, and conferences
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 Tailored programs for non-IT professionals
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 Free data science internship with real-world projects
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 Top-notch placement support
//               </p>
//             </div>

//             <div className="w-full p-6 border border-gray-200 rounded-lg">
//               <p
//                 style={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 400,
//                   fontSize: "12px",
//                   color: "#000",
//                 }}
//               >
//                 NASSCOM FutureSkills Prime certification, globally recognized
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   )
// }

"use client"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProgramHighlights from "@/components/program-highlights"
import TestimonialCards from "@/components/testimonial-cards"
import CorporateTrainingSuccess from "@/components/corporate-training-success"
import StatsSection from "@/components/stats-section"
import AlumniSection from "@/components/alumni-section"
import Footer from "@/components/footer"
import AboutVijanar from "@/components/about-vijanar"
import axios from "axios"
import { useState, useEffect } from "react"
import noData from "../public/icons/noData.jpg";
import Image from "next/image"
import { useRouter } from 'next/navigation' // For Next.js 13 App Router
import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type home = {
  bannerSection: {
    title: string
    subTitle: string
    videoUrl: string
    backgroundImageUrl: string
  }[]
  sectionOne: {
    title: string
    subTitle: string
    images: { imageUrl: string }[]
  }
  sectionTwo: {
    title: string
    subTitle: string
  }
  sectionThree: {
    title: string
    subTitle: string
    points: { title: string; description: string }[]
    imageUrl: string
  }
  sectionFour: {
    title: string
    subTitle: string
    highlights: { imageUrl: string; title: string; description: string }[]
  }
  sectionFive: {
    title: string
    subTitle: string
  }
  sectionSix: {
    title: string
    subTitle: string
  }
  sectionSeven: {
    value1: string
    description1: string
    value2: string
    description2: string
    value3: string
    description3: string
    value4: string
    description4: string
  }
  sectionEight: {
    title: string
    subTitle: string
    images: { imageUrl: string }[]
  }
}

type courseDetails = {
  bannerSection: {
    courseName: string;
    backgroundImageUrl: string;
    imageUrl: string;
    title: string;
    subTitle: string;
    courseFee: number;
    duration: string;
    startDate: string;
    trainingMode: string;
  };
  sectionOne: {
    imageUrl: string;
    title: string;
  }[];
  sectionTwo: {
    title: string;
    description1: string;
    description2: string;
  };
  curriculum: {
    title: string;
    points: {
      description: string;
    }[];
  }[];
  onlineTraining: {
    description1: string;
    description2: string;
  };
  SelfplaceTraining: {
    description1: string;
    description2: string;
  };
  classroomTraining: {
    description1: string;
    description2: string;
  };
  CorporateTraining: {
    description1: string;
    description2: string;
  };
  advantagesSection: {
    title: string;
    advantages: {
      description: string;
    }[];
  };
  toolsSection: {
    title: string;
    tools: {
      imageUrl: string;
      description: string;
    }[];
  };
  videoSection: {
    videoUrl: string;
  };
  enrollSection: {
    title: string;
    description: string;
    points: {
      imageeUrl: string; // notice: in schema it's "imageeUrl" (double 'e')
      description: string;
    }[];
  };
  oppurtunitiesSection: {
    title: string;
    jobs: {
      jobTitle: string;
    }[];
  };
  highLightsSection: {
    title: string;
    highlights: {
      description: string;
    }[];
  };
  _id: string;
};



type about = {
  title: string
  subTitle: string
  points: { title: string; description: string }[]
  imageUrl: string
}

type Highlights = {
  title: string
  subTitle: string
  highlights: {
    imageUrl: string
    title: string
    description: string
  }[]
}
type testimonial = {
  title: string,
  subTitle: string,
  testimonials:{
    name:string,
    role:string,
    imageUrl:string,
    description:string
  }[]
}
type Corporate = {
    title: string
    stories: {
      imageUrl: string
      name: string
      role: string
      companyLogoUrl: string
      package: number
      description1: string
      description2: string
    }[]
}
type Stats = {
    value1: string
    description1: string
    value2: string
    description2: string
    value3: string
    description3: string
    value4: string
    description4: string
}
type Alumni = {
    title: string
    subTitle: string
    images: {
      imageUrl: string
    }[]
}
type HeroSlide = {
  title: string;
  subTitle: string;
  videoUrl: string;
  description?: string;
  backgroundImageUrl: string;
};




export default function HomePage() {
  const router = useRouter(); // For Next.js 13 App Router
  const[loading,setLoading]=useState(true);
  const[failed,setFailed]=useState(false);
  const[homedata,setHomeData]=useState<home | null>(null);
 const [courseData, setCourseData] = useState<courseDetails[]>([]);
  const[aboutdata,setAboutData]=useState<about | null>(null);
  const[ProgramHighlightsData,setProgramHighlightsData]=useState<Highlights | null>(null);
  const[testimonialData,setTestimonialData]=useState<testimonial | null>(null);
  const[corporateData,setCorporateData]=useState<Corporate | null>(null);
  const[statsData,setStatsData]=useState<Stats | null>(null);
  const[alumniData,setAlumniData]=useState<Alumni | null>(null);
 // Custom Arrow Components
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F57F20",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        position: "absolute",
        top: "50%",
        right: "-20px",          // move half of arrow width outside the container
        transform: "translate(-50%,-50%)", // only vertical centering
        zIndex: 10,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaArrowRight color="#fff" size={18} />
    </div>
  );
};


const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F57F20",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        position: "absolute",
        top: "50%",
        left: "0",            // ⬅️ sits on left border of first card
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaArrowLeft color="#fff" size={18} />
    </div>
  );
};


var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=async()=>{
    setLoading(true);
    try{
       const[homeRes,testmonialRes,successStoriesRes,coursesRes]= await Promise.all([
         axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/homepage`),
         axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonialspage`),
         axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/placementpage`),
         axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/coursedetails`),
        ])
        console.log("homeRes",homeRes.data)
        console.log("testmonialRes",testmonialRes.data.sectionOne)
        console.log("successStoriesRes",successStoriesRes.data.sectionTwo)
        console.log("coursesRes",coursesRes.data)
        setHomeData(homeRes.data);
        setCourseData(coursesRes.data.length>4?coursesRes.data.slice(0,4):coursesRes.data);
        setAboutData(homeRes.data.sectionThree);
        setProgramHighlightsData(homeRes.data.sectionFour);
        setTestimonialData(testmonialRes.data.sectionOne);
        setCorporateData(successStoriesRes.data.sectionTwo);
        setStatsData(homeRes.data.sectionSeven);
        setAlumniData(successStoriesRes.data.sectionOne);
        setFailed(false);
    }
    catch(err){
      setFailed(true);
      console.log("Error fetching data:", err);
    }
    finally{
      setLoading(false);
    }
  }
  if(loading){
    return(
       <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-gray-600 text-[30px]">Loading....</h1>
      </div>
    )
  }
   if (failed) {
    return (
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <Image src={noData} alt="server" height={300} width={300} />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={fetchData}
        >
          Reload
        </button>
      </div>
    );
  }
  console.log("about",aboutdata);
  return (
    <main>
      <Header />
     <HeroSection slides={homedata?.bannerSection || []} />

      {/* Career Accelerators Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#4A90E2] font-medium mb-2">{homedata?.sectionOne.title}</p>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight uppercase text-[#4A90E2] mb-8">{homedata?.sectionOne.subTitle}</h2>
          </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
      {homedata?.sectionOne.images.slice(0, 2).map((item, idx) => (
        <div
          key={idx}
          className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={item.imageUrl}
            alt={`Image ${idx + 1}`} // fallback alt text
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
              </div>

            <div className="grid md:grid-cols-2 gap-6">
              {homedata?.sectionOne.images.slice(2, 4).map((item, idx) => (
                <div
                  key={idx + 2}
                  className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={item.imageUrl}
                    alt={`Image ${idx + 3}`} // fallback alt text
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Courses Offered Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gray-600 font-medium mb-2">{homedata?.sectionTwo.title}</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight uppercase text-[#4A90E2] mb-8">
                {homedata?.sectionTwo.subTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {courseData?.slice(0, 4).map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Course Banner */}
                  <div className="relative">
                    <img
                      src={course.bannerSection.imageUrl}
                      alt={course.bannerSection.courseName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#FFB800] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Trending
                      </span>
                    </div>
                  </div>

  {/* Course Content */}
  <div className="p-6 flex flex-col flex-1">
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {course.bannerSection.courseName}
    </h3>

    <div
      className="text-gray-600 text-sm mb-4 prose max-w-none flex-1"
      dangerouslySetInnerHTML={{ __html: course.sectionTwo.description1 }}
    />

    <div className="flex justify-between text-sm text-gray-500 mb-4">
      <div>
        <span className="font-medium">Duration:</span>{" "}
        {course.bannerSection.duration}
      </div>
      <div>
        <span className="font-medium">Training Mode:</span>{" "}
        {course.bannerSection.trainingMode}
      </div>
    </div>

    {/* Button at bottom */}
    <div className="mt-auto">
      <button
        onClick={() => router.push(`/training/${course._id}`)}
        className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-medium hover:bg-[#e55a2b] transition-colors"
      >
        Explore More
      </button>
    </div>
  </div>
              </div>

              ))}
            </div>

            {/* View all Courses */}
            <div className="text-center">
              <a
                href="/training"
                className="text-gray-700 font-medium hover:text-[#FF6B35] transition-colors border-b border-gray-700 hover:border-[#FF6B35]"
              >
                View all Courses
              </a>
            </div>
          </div>
        </section>


     {aboutdata && <AboutVijanar data={aboutdata} />}

      {ProgramHighlightsData && <ProgramHighlights data={ProgramHighlightsData} />}

      {/*Testimonials Section */}

       <section className="py-16 bg-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h5 className="text-[#1A4886] font-medium text-sm">Testimonials</h5>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight uppercase text-[#27AAE1] mb-[30px]">
            {testimonialData?.subTitle}
          </h2>
        </div>

        {/* Slider */}
        <div className="slider-container relative">
          <Slider {...settings}>
            {testimonialData?.testimonials.map((item, idx) => (
              <div key={idx}>
                <div
                  className="flex flex-col items-center justify-start  p-6"
                  style={{
                    marginBottom: "40px",
                    borderRadius: "29px",
                    border: "2px solid #F57F20",
                    marginRight: "20px",
                    background: "#fff",
                  }}
                >
                  {/* Avatar */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      border: "3px solid #FFF",
                      borderRadius: "50%",
                      marginBottom: "20px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Name */}
                  <h4
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "19px",
                      color: "#F57F20",
                      marginBottom: "5px",
                    }}
                  >
                    {item.name}
                  </h4>

                  {/* Role */}
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "19px",
                      color: "#000000",
                      marginBottom: "12px",
                    }}
                  >
                    {item.role}
                  </p>

                  <div className="h-[1px] w-full bg-[#D7D7D7]"></div>

                  {/* Description */}
                  <p
                    className="mt-4 px-3 py-3"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "22px",
                      color: "#454545",
                      textAlign: "center",
                    }}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Stories */}
        <div className="text-center mt-6">
          <a
            href="/placements"
            className="text-[#1A4886] font-semibold text-sm underline"
          >
            View All Stories
          </a>
        </div>
      </div>
    </section>
      
      {/* <TestimonialCards /> */}
      {/* Corporate Training Success Stories Section */}
      {corporateData && <CorporateTrainingSuccess data={corporateData} />}
      {statsData && <StatsSection data={statsData} />}
      {alumniData && <AlumniSection data={alumniData}/>}
      <Footer />
    </main>
  )
}

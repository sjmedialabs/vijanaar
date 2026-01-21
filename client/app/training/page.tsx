"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import noData from "../../public/icons/noData.jpg";
import { useRouter } from "next/navigation";

type Banner = {
  bannerSection: {
    title: string;
    subTitle: string;
    backgroundImageUrl: string;
  };
};

type HomePageData = {
  sectionOne: {
    title: string;
    subTitle: string;
    images: { imageUrl: string }[];
  };
  sectionTwo: {
    title: string;
    subTitle: string;
  };
};

type Course = {
  _id: string;
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
  sectionTwo?: {
    description1?: string;
  };
};

export default function TrainingProgram() {
  const router = useRouter();

  const [trainingData, setTrainingData] = useState<Banner>();
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [trainingRes, homeRes, coursesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/training-programs`),
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/homepage`),
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/coursedetails`),
      ]);

      console.log("Training API response:", trainingRes.data); // check structure
      console.log("Home API response:", homeRes.data);
      console.log("Courses API response:", coursesRes.data);

      setTrainingData(trainingRes.data || null);
      setHomeData(homeRes.data || null);
      setCourseData(coursesRes.data || []);
      setFailed(false);
    } catch (error) {
      setFailed(true);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-gray-600 text-[30px]">Loading....</h1>
      </div>
    );
  }

  if (failed || !trainingData?.bannerSection || !homeData) {
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

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        {trainingData.bannerSection?.backgroundImageUrl && (
          <Image
            src={trainingData.bannerSection.backgroundImageUrl}
            alt={trainingData.bannerSection.title || "Placements Hero"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-10 text-left text-white max-w-7xl mx-auto pl-[40px] md:pl-[100px] w-full">
          <div className="max-w-sm">
            <h1
              className="mb-1 mt-4 md:mt-0"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                fontSize: "40px",
                color: "#fff",
              }}
            >
              {trainingData.bannerSection?.title}
            </h1>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "200",
                fontSize: "23px",
                color: "#fff",
              }}
              dangerouslySetInnerHTML={{ __html: trainingData.bannerSection?.subTitle || "" }}
            />
          </div>
        </div>
      </section>

      {/* Career Accelerators Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#4A90E2] font-medium mb-2">{homeData.sectionOne.title}</p>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight uppercase text-[#4A90E2] mb-8">{homeData?.sectionOne.subTitle}</h2>
          </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
      {homeData?.sectionOne.images.slice(0, 2).map((item, idx) => (
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
              {homeData?.sectionOne.images.slice(2, 4).map((item, idx) => (
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
              <p className="text-gray-600 font-medium mb-2">{homeData?.sectionTwo.title}</p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight uppercase text-[#4A90E2] mb-8">
                {homeData?.sectionTwo.subTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {courseData?.map((course, idx) => (
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
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.bannerSection.courseName}
                    </h3>

            {/* Description (HTML from backend, optional) */}
                  {course.sectionTwo?.description1 && (
                    <div
                      className="text-gray-600 text-sm mb-4 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: course.sectionTwo.description1 }}
                    />
                  )}

                    {/* Course Info */}
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

                    {/* Button */}
                    <button
                      onClick={() => router.push(`/training/${course._id}`)}
                      className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-medium hover:bg-[#e55a2b] transition-colors"
                    >
                      Explore More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      <Footer />
    </main>
  );
}

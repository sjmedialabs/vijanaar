"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import noData from "../../public/icons/noData.jpg";
import AlumniSection from "@/components/alumni-section"

type AboutUsPageData = {
  bannerSection: {
    title: string;
    subTitle: string; // contains HTML
    backgroundImageUrl: string;
  };
  sectionOne: {
    title: string;
    description1: string; // contains HTML
    description2: string; // contains HTML
  };
  sectionTwo: {
    title: string;
    points: {
      title: string;
      description: string; // contains HTML
    }[];
  };
  sectionThree: {
    title: string;
    imageUrl: string;
    description: string; // contains HTML
  }[];
};

type HomePageData = {
  sectionSeven: {
    value1: string;
    description1: string; // contains HTML
    value2: string;
    description2: string; // contains HTML
    value3: string;
    description3: string; // contains HTML
    value4: string;
    description4: string; // contains HTML
  };
  sectionEight: {
    title: string;
    subTitle: string; // contains HTML
    images: { imageUrl: string }[];
  };
};

export default function AboutUsPage() {
  const [aboutData, setAboutData] = useState<AboutUsPageData | null>(null);
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const[aluminiData,setAluminiData]=useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [aboutRes, homeRes,aluminires] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/aboutuspage`),
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/homepage`),
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/placementpage`)
      ]);
      setAboutData(aboutRes.data);
      setHomeData(homeRes.data);
      setAluminiData(aluminires.data.sectionOne);
      setFailed(false);
    } catch (error) {
      setFailed(true);
      console.log("Error fetching data:", error);
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

  if (failed || !aboutData || !homeData) {
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

      {/* Banner Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={aboutData.bannerSection.backgroundImageUrl}
            alt="About Us Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-left text-white max-w-7xl mx-auto pl-[40px] md:pl-[100px] w-full">
          <div className="max-w-sm">
            <h1 className="mb-2 text-4xl font-bold">{aboutData.bannerSection.title}</h1>
            <p
              className="text-lg font-light"
              dangerouslySetInnerHTML={{ __html: aboutData.bannerSection.subTitle }}
            />
          </div>
        </div>
      </section>

      {/* Section One */}
      <section className="py-16 bg-[#fff] text-center my-[50px]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-md font-semibold text-[#2F5596]">About Us</h2>
          <h2 className="text-2xl font-bold mb-4 text-[#27AAE1]">{aboutData.sectionOne.title}</h2>
          <p
            className="text-[#656565] font-normal text-xs mb-6"
            dangerouslySetInnerHTML={{ __html: aboutData.sectionOne.description1 }}
          />
          <p
            className="text-[#656565] font-normal text-xs"
            dangerouslySetInnerHTML={{ __html: aboutData.sectionOne.description2 }}
          />
        </div>
      </section>

      {/* Section Two */}
      <section className="py-16 bg-[#F2FBFF]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-md font-semibold text-[#2F5596] text-center">Choose Us</h2>
          <h2 className="text-xl font-semibold mb-6 text-[#27AAE1] text-center">{aboutData.sectionTwo.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.sectionTwo.points.map((point, idx) => (
              <div key={idx} className="p-6 bg-[#F2FBFF] border-1 border-[#EAEAEA] rounded-lg w-full">
                <h3 className="font-semibold text-md text-[#000000] mb-2">{point.title}</h3>
                <p
                  className="text-xs text-[#656565] font-normal"
                  dangerouslySetInnerHTML={{ __html: point.description }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ backgroundColor: "#F57F20" }}>
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center text-white">
          <div className="flex flex-col items-center justify-center relative mb-8 lg:mb-0">
            <h3 className="text-4xl font-bold">{homeData.sectionSeven.value1}</h3>
            <p
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: homeData.sectionSeven.description1 }}
            />
            <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 border-r border-white"></span>
          </div>

          <div className="flex flex-col items-center justify-center relative mb-8 lg:mb-0">
            <h3 className="text-4xl font-bold">{homeData.sectionSeven.value2}</h3>
            <p
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: homeData.sectionSeven.description2 }}
            />
            <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 border-r border-white"></span>
          </div>

          <div className="flex flex-col items-center justify-center relative mb-8 lg:mb-0">
            <h3 className="text-4xl font-bold">{homeData.sectionSeven.value3}</h3>
            <p
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: homeData.sectionSeven.description3 }}
            />
            <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 border-r border-white"></span>
          </div>

          <div className="flex flex-col items-center justify-center mb-8 lg:mb-0">
            <h3 className="text-4xl font-bold">{homeData.sectionSeven.value4}</h3>
            <p
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: homeData.sectionSeven.description4 }}
            />
          </div>
        </div>
      </section>

      {/* Section Three */}
      <section className="py-16 bg-[#fff]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutData.sectionThree.map((item, idx) => (
              <div key={idx} className="bg-white border-1 border-[#EAEAEA] rounded-lg p-8">
                <div className="flex flex-row justify-start items-center mb-4 gap-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                  <h3 className="text-xl font-semibold text-[#FC2101] max-w-[14px] items-center">
                    {item.title}
                  </h3>
                </div>

                <div>
                  <p
                    className="text-[#656565] text-xs font-normal text-justify leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners Section *
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p
            className="text-[#454545] font-medium text-xs text-center"
            dangerouslySetInnerHTML={{ __html: homeData.sectionEight.title }}
          />
          <h2
            className="text-[#27AAE1] text-xl font-semibold mb-6 text-center"
            dangerouslySetInnerHTML={{ __html: homeData.sectionEight.subTitle }}
          />
          <div className="flex justify-center gap-6 flex-wrap">
            {aluminiData.sectionOne.images.map((img, i) => (
              <Image
                key={i}
                src={img.imageUrl}
                alt="Hiring Partner Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </section>*/}
      {aluminiData && <AlumniSection data={aluminiData}/>}

      <Footer />
    </main>
  );
}

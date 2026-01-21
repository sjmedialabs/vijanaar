"use client"
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import noData from "../../public/icons/noData.jpg";

type Story = {
  imageUrl: string;
  name: string;
  role: string;
  companyLogoUrl: string;
  package: number;
  description1: string; // stored as HTML string
  description2: string; // stored as HTML string
};

type PlacementPageData = {
  bannerSection: {
    title: string;
    subTitle: string; // stored as HTML string
    backgroundImageUrl: string;
  };
  sectionOne: {
    title: string;
    images: { imageUrl: string }[];
  };
  sectionTwo: {
    title: string;
    stories: Story[];
  };
};

export default function PlacementsPage() {
  const [data, setData] = useState<PlacementPageData | null>(null);
  const [successStories, setSuccessStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/placementpage`
      );
      setData(response.data);
      setSuccessStories(response.data.sectionTwo.stories || []);
      setFailed(false);
    } catch (error) {
      setFailed(true);
      console.log("Error", error);
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

  if (failed || !data) {
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

  // pagination logic
  const totalPages = Math.ceil(successStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStories = successStories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={data.bannerSection.backgroundImageUrl}
            alt="Placements Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0"></div>
        </div>
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
              {data.bannerSection.title}
            </h1>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "200",
                fontSize: "23px",
                color: "#fff",
              }}
              dangerouslySetInnerHTML={{ __html: data.bannerSection.subTitle }}
            />
          </div>
        </div>
      </section>

      {/* Our Hiring Partners Section */}
      <section className="py-16 bg-[#F2FBFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5">
            <p
              className="mb-0"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                color: "#2F5596",
              }}
            >
              Partners
            </p>
            <h2
              className="mb-0"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                fontSize: "18px",
                color: "#27AAE1",
              }}
            >
              {data.sectionOne.title}
            </h2>
          </div>

          <div className="flex justify-center gap-6 flex-wrap">
            {data.sectionOne.images.map((img, i) => (
              <Image
                key={i}
                src={img.imageUrl}
                alt="Hiring Partner Logo"
                width={120}
                height={50}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-6 bg-white mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2F5596",
              }}
            >
              Success Stories
            </p>
            <h2
              className="mb-8"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                fontSize: "18px",
                color: "#27AAE1",
              }}
            >
              {data.sectionTwo.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStories.map((story, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-3xl mb-[20px] text-center w-full  max-w-sm"
              >
                {/* Congratulations Image */}
                <Image
                  src={story.imageUrl}
                  alt={`congratulations ${index + 1}`}
                  width={200}
                  height={60}
                  className="mx-auto mt-4"
                />

                {/* Candidate Info */}
                <h2 className="text-[14px] font-bold text-[#1A4886]">
                  {story.name}
                </h2>
                <p className="text-[#959596] text-[12px] mb-3">{story.role}</p>

                {/* Company Logo */}
                <div className="flex justify-center items-center mb-3 gap-[20px]">
                  <Image
                    src={story.companyLogoUrl}
                    alt={`company logo ${index + 1}`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  {/* Package */}
                  <p className="text-[#1a237e] text-[14px] font-bold">
                    Salary package
                    <br /> {story.package} LPA
                  </p>
                </div>

                {/* Blue Section */}
                <div
                  className="bg-[#27AAE1] text-white text-[12px] font-medium mt-4 px-3"
                  dangerouslySetInnerHTML={{ __html: story.description1 }}
                />

                {/* Orange Section */}
                <div
                  className="bg-[#FCB040] text-white text-[12px] font-medium rounded-b-3xl px-3 py-2"
                  dangerouslySetInnerHTML={{ __html: story.description2 }}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-5 items-center space-x-2">
            {/* Previous button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-2 text-[#000] rounded-sm border border-[#D3D3D3] disabled:opacity-50"
            >
              Previous
            </button>

            {/* Page number buttons (max 5 visible) */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 5) return true;
                if (currentPage <= 3) return page <= 5;
                if (currentPage >= totalPages - 2) return page >= totalPages - 4;
                return page >= currentPage - 2 && page <= currentPage + 2;
              })
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-sm border border-[#D3D3D3] ${
                    currentPage === page
                      ? "bg-[#F57F20] text-white font-bold"
                      : "text-[#000]"
                  }`}
                >
                  {page}
                </button>
              ))}

            {/* Next button */}
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-2 text-[#000] rounded-sm border border-[#D3D3D3] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client"
import React, { useEffect, useState } from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
// import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import axios from "axios";

interface CompanyDetails {
  sectionOne: {
    headerLogoUrl: string;
    footerLogoUrl: string;
    favIconUrl: string;
    companyName: string;
    phone1: string;
    phone2: string;
    email1: string;
    email2: string;
  };
}
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE}/companydetails`);
        setCompanyDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch company details:", error);
      }
    };

    fetchCompanyDetails();
  }, []);
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={100}
                  height={32}
                  src={companyDetails?.sectionOne.footerLogoUrl}
                  alt={companyDetails?.sectionOne.companyName || "Logo"}
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
               Sign in to {companyDetails?.sectionOne.companyName} Admin Panel — Secure access to manage and monitor your mining operations efficiently
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          {/* <ThemeTogglerTwo /> */}
        </div>
      </div>
    </div>
  );
}

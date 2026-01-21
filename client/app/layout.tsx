import type React from "react";
import type { Metadata } from "next";
import { Figtree, Poppins } from "next/font/google";
import { Suspense } from "react";
import { EnrollmentProvider } from "@/components/enrollment-context";
import EnrollmentModal from "@/components/enrollment-modal";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

// ✅ Generate metadata dynamically from API
export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/companydetails`, {
      // ensures fresh data at build + runtime
      next: { revalidate: 60 }, 
    });
    console.log("company details", res);
    if (!res.ok) {
      throw new Error("Failed to fetch company details");
    }

    const data = await res.json();

    return {
      title: data?.sectionOne?.companyName,
      description: data.digitalMarketingTags.metaDescription ||
        "Empowering innovators with future-ready tech skills since 2019",
      icons: {
        icon: data?.sectionOne?.favIconUrl || "/favicon.ico", // fallback to default
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Vijanaar",
      description: "Empowering innovators with future-ready tech skills since 2019",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${figtree.variable} ${poppins.variable} antialiased`}
      >
        <EnrollmentProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <EnrollmentModal />
        </EnrollmentProvider>
      </body>
    </html>
  );
}
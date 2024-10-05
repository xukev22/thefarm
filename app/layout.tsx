import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import SessionContextWrapper from "@/context/session-context-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Farm",
  description: "the best mvp, i hope",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-3 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        {/* Cow print-like background with blobs */}
        <div className="absolute inset-0 -z-10">
          {/* Irregular blobs */}
          <div className="absolute top-10 left-12 bg-slate-300 h-28 w-36 rounded-[60%] rotate-12"></div>
          <div className="absolute top-8 left-6 bg-slate-300 h-28 w-36 rounded-[60%] rotate-7"></div>
          <div className="absolute top-20 right-16 bg-gray-700 h-36 w-44 rounded-[50%] rotate-6"></div>
          <div className="absolute bottom-12 left-20 bg-[#edd4b7] h-32 w-48 rounded-[70%] rotate-3"></div>
          <div className="absolute bottom-24 right-10 bg-emerald-900 h-40 w-56 rounded-[60%] -rotate-8"></div>
          <div className="absolute top-36 left-40 bg-orange-300 h-24 w-32 rounded-[65%] rotate-9"></div>
          <div className="absolute bottom-36 right-36 bg-[#ff9b5d] h-30 w-40 rounded-[55%] rotate-15"></div>
        </div>
        <SessionContextWrapper>
          <Navbar />
        </SessionContextWrapper>
        {children}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

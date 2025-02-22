import Loading from "@/components/loading";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { FarmDB, SessionProps, CowDB } from "@/lib/types";
import FarmOverview from "./farm-overview";
import { useServiceContext } from "@/context/service-context";

export default function FarmDashboard({ session }: SessionProps) {
  const [farmData, setFarmData] = useState<FarmDB>();
  const [cowsData, setCowsData] = useState<CowDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement | null>(null); // Ref for the rendered content
  const { selectedService } = useServiceContext();

  useEffect(() => {
    if (!pathname) return;

    setLoading(true); // Start loading before making the API request
    const farmid = pathname.substring(pathname.lastIndexOf("/") + 1); // Get the last part of the URL

    const fetchFarmData = async () => {
      try {
        const response = await fetch(`/api/farms/${farmid}`);
        if (response.status === 401) {
          setError("Unauthorized, you do not own this farm.");
        } else if (response.status === 404) {
          setError("Farm not found.");
        } else if (!response.ok) {
          setError("Something went wrong.");
        } else {
          const data = await response.json();
          setFarmData(data.farm);
          setCowsData(data.cows);
        }
      } catch (err) {
        console.error("Error fetching farm data:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false); // Always set loading to false, success or error
      }
    };

    fetchFarmData();
  }, [pathname]);

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>{error}</div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Loading message="Loading..." />
      </main>
    );
  }

  if (!farmData) {
    return <div>error loading farm data</div>;
  }

  const renderContent = () => {
    switch (selectedService) {
      case "Overview":
        return <FarmOverview />;
      default:
        return <div>To be implemented.</div>;
    }
  };

  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>
        {farmData.name} - {selectedService}
      </SectionHeading>
      {/* Pass the new handler */}
      <div ref={contentRef}>{renderContent()}</div>
      {/* Add the ref to the rendered content */}
    </motion.section>
  );
}

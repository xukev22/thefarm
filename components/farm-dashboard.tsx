"use client";

import Loading from "@/components/loading";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Session } from "next-auth"; // Import the Session type
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";

interface SessionProps {
  session: Session;
}

interface Farm {
  id: number;
  name: string;
  location: string;
}

interface Cow {
  id: number;
  name: string;
  notes: string;
}

export default function FarmDashboard({ session }: SessionProps) {
  const [farmData, setFarmData] = useState<Farm>();
  const [cowsData, setCowsData] = useState<Cow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname(); // Get farmid from the URL using useParams

  useEffect(() => {
    if (!pathname) return; // If pathname is not yet available, return early

    setLoading(true); // Start loading before making the API request
    const farmid = pathname.substring(pathname.lastIndexOf("/") + 1); // Get the last part of the URL

    const fetchFarmData = async () => {
      try {
        console.log(`/api/farm/${farmid}`);
        const response = await fetch(`/api/farms/${farmid}`);

        if (response.status === 401) {
          setError("Unauthorized, you do not own this farm.");
        } else if (response.status === 404) {
          setError("Farm not found.");
        } else if (!response.ok) {
          setError("Something went wrong.");
        } else {
          const data = await response.json();
          console.log("use effect data");
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
  }, [pathname]); // Add pathname as a dependency

  //   console.log(farmData);

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

  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>
        Hey {session.user.name}, here's the latest data on {farmData.name}
      </SectionHeading>
      <div>
        <h1>Farm Information</h1>
        <p>Farm ID: {farmData.id}</p>
        <p>Farm Name: {farmData.name}</p>

        <h2>Cows:</h2>
        <ul>
          {cowsData.map((cow: any) => (
            <li key={cow.id}>
              Cow ID: {cow.id}, Cow Name: {cow.name}, Cow Notes: {cow.notes}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

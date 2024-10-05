"use client";

import Loading from "@/components/loading";
import { useParams, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Farm() {
  const [farmData, setFarmData] = useState<any>(null);
  const [cowsData, setCowsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname(); // Get farmid from the URL using useParams

  useEffect(() => {
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
  }, []);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Farm Information</h1>
        <p>Farm ID: {farmData.id}</p>
        <p>Farm Name: {farmData.name}</p>

        <h2>Cows:</h2>
        <ul>
          {cowsData.map((cow: any) => (
            <li key={cow.id}>
              Cow ID: {cow.id}, Cow Name: {cow.name}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

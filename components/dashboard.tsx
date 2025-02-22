import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa"; // Arrow icon
import SectionHeading from "./section-heading";
import Loading from "./loading";
import { FarmDB, SessionProps } from "@/lib/types";

// Generate a random background gradient for the cards
const randomBackground = () => {
  const gradients = [
    "bg-gradient-to-r from-green-400 to-blue-500",
    "bg-gradient-to-r from-purple-400 to-pink-500",
    "bg-gradient-to-r from-yellow-400 to-red-500",
    "bg-gradient-to-r from-teal-400 to-cyan-500",
    "bg-gradient-to-r from-indigo-400 to-purple-500",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

export default function Dashboard({ session }: SessionProps) {
  const [farms, setFarms] = useState<FarmDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // To handle navigation
  useEffect(() => {
    const fetchFarms = async () => {
      setLoading(true); // Start loading before making the API request

      try {
        const res = await fetch("/api/farms", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setFarms(data.farms); // Assuming the farms array is returned from the API
      } catch (err) {
        setError("Failed to fetch farms. Please try again later.");
      } finally {
        setLoading(false); // Always set loading to false, success or error
      }
    };

    fetchFarms();
  }, []);

  if (loading) {
    return <Loading message="Loading your farms..." />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Handle farm card click
  const handleCardClick = (farmId: number) => {
    router.push(`/dashboard/farms/${farmId}`);
  };

  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>
        Hey {session.user.name}, let's choose a farm to monitor
      </SectionHeading>

      {farms.length > 0 ? (
        <div className="space-y-4 mt-6">
          {farms.map((farm) => (
            <div
              key={farm.id}
              onClick={() => handleCardClick(farm.id)}
              className={`cursor-pointer rounded-lg p-6 text-white flex justify-between items-center hover:scale-105 transition-transform duration-300 ${randomBackground()}`}
            >
              <div>
                <h3 className="font-bold text-xl">{farm.name}</h3>
                <p className="text-sm">Location: {farm.location}</p>
              </div>
              <FaArrowRight className="text-2xl" />
            </div>
          ))}
        </div>
      ) : (
        <p>You have no farms added... yet!</p>
      )}
    </motion.section>
  );
}

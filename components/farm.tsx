import React, { useState, useEffect } from "react";
import { Session } from "next-auth"; // Import the Session type
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import Loading from "./loading";

interface FarmProps {
  session: Session;
}

interface Farm {
  id: number;
  name: string;
  location: string;
}

export default function Farm({ session }: FarmProps) {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarms = async () => {
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
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch farms. Please try again later.");
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (loading) {
    return <Loading message="Loading your farms..."/>;
  }

  if (error) {
    return <p>{error}</p>;
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
        Hey {session.user.name}, let's choose a farm to monitor
      </SectionHeading>

      {farms.length > 0 ? (
        <ul className="text-left mt-6">
          {farms.map((farm) => (
            <li key={farm.id} className="mb-4">
              <h3 className="font-bold text-lg">{farm.name}</h3>
              <p className="text-sm">Location: {farm.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no farms added... yet!</p>
      )}
    </motion.section>
  );
}

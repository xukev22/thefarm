import { PingDB } from "@/lib/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import Loading from "./loading";
import { FaMapMarker } from "react-icons/fa";

export default function FarmOverview() {
  // TODO secure client token
  console.log(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pingData, setPingData] = useState<PingDB[]>();

  useEffect(() => {
    if (!pathname) return;

    setLoading(true); // Start loading before making the API request
    const farmid = pathname.substring(pathname.lastIndexOf("/") + 1); // Get the last part of the URL

    const fetchFarmData = async () => {
      try {
        const response = await fetch(`/api/cows/${farmid}`);
        if (response.status === 401) {
          setError("Unauthorized, you do not own this farm.");
        } else if (response.status === 404) {
          setError("Farm not found.");
        } else if (!response.ok) {
          setError("Something went wrong.");
        } else {
          const data = await response.json();
          setPingData(data.pings);
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

  if (!pingData) {
    return <div>error loading farm data</div>;
  }

  return (
    <div>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/kevuhh/cm1zxjc4k001501pi5hwegfhd"
      >
        {pingData.map((ping: PingDB) => (
          <Marker
            key={ping.cow_id} // Add a unique key prop
            longitude={ping.longitude}
            latitude={ping.latitude}
            anchor="bottom"
          >
            <FaMapMarker />
          </Marker>
        ))}
      </Map>
    </div>
  );
}

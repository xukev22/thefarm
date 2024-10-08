import { CowDB } from "@/lib/types";
import React from "react";
import Map from "react-map-gl";

export default function FarmOverview({ cows }: { cows: CowDB[] }) {
    // TODO secure client token
  console.log(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);
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
      />
      {cows.map((cow: CowDB) => (
        <p>{cow.id}</p>
      ))}
    </div>
  );
}

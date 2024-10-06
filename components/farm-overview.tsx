import { CowDB } from "@/lib/types";
import React from "react";

export default function FarmOverview({ cows }: { cows: CowDB[] }) {
  return (
    <div>
      {cows.map((cow: CowDB) => (
        <p>{cow.id}</p>
      ))}
    </div>
  );
}

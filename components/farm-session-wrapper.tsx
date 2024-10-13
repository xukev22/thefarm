"use client";

import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import FarmDashboard from "@/components/farm-dashboard";
import BaseContainer from "@/components/base-container";
import Sidebar from "./sidebar";

export default function FarmSessionWrapper() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar: 25% width */}
      <div className="w-1/4">
        {session ? (
          <Sidebar session={session} />
        ) : (
          <Loading message="Loading session..." />
        )}
      </div>

      {/* BaseContainer: 75% width */}
      <div className="w-3/4">
        <BaseContainer>
          {session ? (
            <FarmDashboard session={session} />
          ) : (
            <Loading message="Loading session..." />
          )}
        </BaseContainer>
      </div>
    </div>
  );
}

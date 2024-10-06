"use client";

import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import FarmDashboard from "@/components/farm-dashboard";
import BaseContainer from "@/components/base-container";

export default function FarmSessionWrapper() {
  const { data: session } = useSession();

  return (
    <BaseContainer>
      {session ? (
        <FarmDashboard session={session} />
      ) : (
        <Loading message="Loading session..." />
      )}
    </BaseContainer>
  );
}

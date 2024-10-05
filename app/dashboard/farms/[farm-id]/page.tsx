"use client";

import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import FarmDashboard from "@/components/farm-dashboard";

export default function Farm() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <FarmDashboard session={session} />
      ) : (
        <Loading message="Loading session..." />
      )}
    </main>
  );
}

"use client";

import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/dashboard";

export default function Farms() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <Dashboard session={session} />
      ) : (
        <Loading message="Loading session..." />
      )}
    </main>
  );
}

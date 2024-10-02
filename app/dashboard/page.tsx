"use client";

import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import Farm from "@/components/farm";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? <Farm session={session} /> : <Loading message="Loading session..."/>}
    </main>
  );
}

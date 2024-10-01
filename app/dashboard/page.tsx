"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? <p>my dashboard {session.user.id}</p> : <p>Loading...</p>}
    </main>
  );
}

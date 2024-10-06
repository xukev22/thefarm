"use client";

import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import Dashboard from "@/components/dashboard";
import BaseContainer from "@/components/base-container";

export default function Test() {
  const { data: session } = useSession();

  return (
    <BaseContainer>
      {session ? (
        <Dashboard session={session} />
      ) : (
        <Loading message="Loading session..." />
      )}
    </BaseContainer>
  );
}

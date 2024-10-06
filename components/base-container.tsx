import { WithChildren } from "@/lib/types";
import React from "react";

export default function BaseContainer({ children }: WithChildren) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {children}
    </main>
  );
}

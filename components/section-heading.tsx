import { WithChildren } from "@/lib/types";
import React from "react";

export default function SectionHeading({ children }: WithChildren) {
  return <h2 className="text-3xl font-medium mb-8 text-center">{children}</h2>;
}

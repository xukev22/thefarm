import { LoadingProps } from "@/lib/types";
import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FaSpinner className="animate-spin text-blue-500 text-5xl mb-3" />
      <p className="text-lg text-gray-700">{message}</p>
    </div>
  );
}

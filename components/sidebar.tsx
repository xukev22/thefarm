import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SidebarContent from "./sidebar-content";
import { SessionProps } from "@/lib/types";

export default function Sidebar({ session }: SessionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="pt-16">
      {/* Adjust the padding as needed */}
      {isOpen ? (
        <SidebarContent session={session} setIsOpen={setIsOpen} />
      ) : (
        <div
          className="p-2 bg-white rounded-lg shadow-lg w-fit hover:scale-110 ml-2 mt-2"
          onClick={() => setIsOpen(true)}
        >
          {/* Hamburger icon when sidebar is closed */}
          <GiHamburgerMenu className="h-6 w-6 text-green-600  hover:text-green-700" />
        </div>
      )}
    </div>
  );
}

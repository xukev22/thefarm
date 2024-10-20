import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SidebarContent from "./sidebar-content";
import { SessionProps } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ session }: SessionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="pt-16">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Tint Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // Faster fade out for the overlay
              transition={{ duration: 0.2 }} // Shorter duration for the overlay fade out
            />
            <motion.div
              initial={{ x: -300 }} // Sidebar starts off-screen
              animate={{ x: 0 }} // Sidebar animates into view
              exit={{ x: -300 }} // Sidebar animates out of view on close
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed top-20 left-0 z-50 w-72 h-auto rounded-lg"
            >
              <SidebarContent session={session} setIsOpen={setIsOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="p-2 bg-white rounded-lg shadow-lg w-fit hover:scale-110 ml-2 mt-2 cursor-pointer"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }} // Start with reduced opacity and scale
            animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and normal scale
            transition={{ duration: 1, ease: "easeOut" }} // Animation duration and easing
          >
            {/* Hamburger icon when sidebar is closed */}
            <GiHamburgerMenu className="h-6 w-6 text-green-600 hover:text-green-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { links } from "@/lib/data";
import { useSession } from "next-auth/react";

// Type for individual link items
interface LinkItem {
  name: string;
  link: string;
}

export default function Header() {
  const { data: session } = useSession();

  const pathname = usePathname();

  const [activeLink, setActiveLink] = useState<string>("Home");
  // Sync active link with the current pathname
  useEffect(() => {
    const activeItem = links.find((linkItem) => linkItem.link === pathname);
    if (activeItem) {
      setActiveLink(activeItem.name);
    }
  }, [pathname]); // Runs whenever the pathname changes

  // Handle click outside the motion component
  const handleLinkClick = (name: string) => {
    setActiveLink(name);
  };

  // Split links into left and right (you can modify the logic based on your needs)
  const leftLinks = links.slice(0, Math.ceil(links.length / 2));
  const rightLinks = links.slice(Math.ceil(links.length / 2));

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-white shadow-lg py-4 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-green-800">
          <Link href="/">THE FARM</Link>
        </div>

        {/* Links */}
        <ul className="flex space-x-6">
          {/* Left links animate from the left */}
          {leftLinks.map((linkItem: LinkItem) => (
            <motion.li
              key={linkItem.name}
              className={`relative cursor-pointer px-4 py-2 rounded-lg font-medium transition-all ${
                activeLink === linkItem.name
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                x: {
                  duration: 0.8,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
            >
              <Link
                href={linkItem.link}
                onClick={() => handleLinkClick(linkItem.name)}
              >
                {linkItem.name}
              </Link>
              {activeLink === linkItem.name && (
                <motion.span
                  layoutId="highlight"
                  className="absolute inset-0 bg-green-700 rounded-lg -z-10"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.5,
                  }}
                />
              )}
            </motion.li>
          ))}

          {/* Right links animate from the right */}
          {rightLinks.map((linkItem: LinkItem) => (
            <motion.li
              key={linkItem.name}
              className={`relative cursor-pointer px-4 py-2 rounded-lg font-medium transition-all ${
                activeLink === linkItem.name
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                x: {
                  duration: 0.8,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
            >
              <Link
                href={linkItem.link}
                onClick={() => handleLinkClick(linkItem.name)}
              >
                {linkItem.name}
              </Link>
              {activeLink === linkItem.name && (
                <motion.span
                  layoutId="highlight"
                  className="absolute inset-0 bg-green-700 rounded-lg -z-10"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.5,
                  }}
                />
              )}
            </motion.li>
          ))}
        </ul>

        {/* Sign In */}
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">
              Welcome back,{" "}
              <span className="text-green-800">{session.user.name}</span>
            </span>
            <Link href="/api/auth/signout">
              <motion.button
                className="bg-green-800 text-white px-4 py-2 rounded-lg shadow-lg transition transform hover:bg-green-900 hover:scale-105 active:scale-110"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.1 }}
              >
                Log Out
              </motion.button>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/api/auth/signin">
              <motion.button
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition transform hover:bg-green-700 hover:scale-105 active:scale-110"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.1 }}
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

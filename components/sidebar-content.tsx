import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5"; // Close icon
import {
  FiInbox,
  FiCheckSquare,
  FiHome,
  FiBox,
  FiUser,
  FiBarChart2,
  FiDollarSign,
  FiFileText,
  FiLink,
} from "react-icons/fi"; // Icons for sidebar items
import { Session } from "next-auth";

interface SidebarContentProps {
  session: Session;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarContent({
  session,
  setIsOpen,
}: SidebarContentProps) {
  return (
    <>
      {/* Overlay for tint effect */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40" // Added tint with bg-opacity
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-20 left-0 z-50 w-72 h-auto rounded-lg" // Rounded top and bottom, height auto
      >
        <div className="bg-green-600 text-white rounded-lg h-full w-full p-4 flex flex-col justify-between">
          {/* Close Button */}
          <div className="flex justify-end">
            <IoClose
              className="h-6 w-6 text-white hover:text-gray-300 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Sidebar Header */}
          <div className="text-center font-bold text-lg mb-6">
            {session.user.name}'s Farm
          </div>

          {/* Sidebar Links */}
          <div className="space-y-4">
            <div>
              <div className="font-semibold mb-2">Dashboard</div>
              <div className="flex items-center space-x-3 mb-2">
                <FiInbox />
                <span>My inbox</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <FiCheckSquare />
                <span>My tasks</span>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-2">Dashboard</div>
              <div className="flex items-center space-x-3 mb-2">
                <FiHome />
                <span>Overview</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <FiBox />
                <span>Products</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <FiUser />
                <span>Orders</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <FiBarChart2 />
                <span>Analytics</span>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-2">Payments</div>
              <div className="flex items-center space-x-3 mb-2">
                <FiHome />
                <span>Overview</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <FiDollarSign />
                <span>Payments</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <FiFileText />
                <span>Invoices</span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <FiLink />
                <span>Integrations</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center mt-6">
            <img
              src="/path-to-user-image.jpg"
              alt="User Profile"
              className="rounded-full h-8 w-8"
            />
            <span className="ml-3">User Name</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

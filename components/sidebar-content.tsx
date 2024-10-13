import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5"; // Close icon
import { services } from "../lib/data"; // Import services data
import { Session } from "next-auth";
import { useServiceContext } from "@/context/service-context";

interface SidebarContentProps {
  session: Session;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarContent({
  session,
  setIsOpen,
}: SidebarContentProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const { setSelectedService } = useServiceContext(); // Get the context value

  // Handler function for hover
  const handleHover = (serviceName: string | null) => {
    setHoveredService(serviceName);
  };

  // Handler function for click
  const handleClick = (serviceName: string) => {
    setSelectedService(serviceName); // Set the global state
    console.log(serviceName);
    setIsOpen(false); // Close the sidebar
  };
  return (
    <>
      {/* Overlay for tint effect */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-20 left-0 z-50 w-72 h-auto rounded-lg"
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

          {/* Dynamically render service groups */}
          <div className="space-y-6">
            {services.map((group, idx) => (
              <div key={idx}>
                {/* Group header */}
                <div className="font-semibold mb-2">{group.header}</div>

                {/* Service items */}
                {group.services.map((service, serviceIdx) => (
                  <motion.div
                    key={serviceIdx}
                    className="flex items-center space-x-3 mb-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => handleHover(service.name)}
                    onHoverEnd={() => handleHover(null)}
                    onClick={() => handleClick(service.name)} // Handle click event
                  >
                    <service.icon className="h-5 w-5" />
                    <span className="hover:text-gray-300">{service.name}</span>

                    {/* Tooltip on hover */}
                    {hoveredService === service.name && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 left-full ml-2 bg-white text-black p-2 rounded-lg shadow-lg"
                      >
                        {service.description}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          {/* <div className="flex items-center mt-6">
            <img
              src="/path-to-user-image.jpg"
              alt="User Profile"
              className="rounded-full h-8 w-8"
            />
            <span className="ml-3">{session.user.name}</span>
          </div> */}
        </div>
      </motion.div>
    </>
  );
}

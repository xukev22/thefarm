import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5"; // Left arrow icon
import { services } from "../lib/data";
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
  const { selectedService, setSelectedService } = useServiceContext();

  const handleHover = (serviceName: string | null) => {
    setHoveredService(serviceName);
  };

  const handleClick = (serviceName: string) => {
    if (selectedService === serviceName) {
      setIsOpen(false);
    }
    setSelectedService(serviceName);
  };

  const getRandomBadgeNumber = () => Math.floor(Math.random() * 15);

  return (
    <>
      {/* Sidebar */}
      <div className="bg-gradient-to-br from-gray-200 to-green-600 text-white rounded-lg h-full w-full p-4 flex flex-col justify-between">
        {/* Header with Close Icon and Title */}
        <div className="flex justify-between items-center">
          <div className="text-lg text-left text-black">The Farm</div>
          <IoArrowBack
            className="h-6 w-6 text-white hover:text-gray-300 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Dynamically render service groups */}
        <div className="space-y-8 mt-6">
          {services.map((group, idx) => (
            <div key={idx}>
              {/* Group header */}
              <div className="font-semibold text-gray-400 mb-3 pl-4">
                {group.header}
              </div>

              {/* Service items */}
              {group.services.map((service, serviceIdx) => (
                <motion.div
                  key={serviceIdx}
                  className={`flex items-center justify-between pl-6 pr-2 py-3 mb-2 cursor-pointer space-x-3
                    ${
                      selectedService === service.name
                        ? "bg-green-500 text-white rounded-lg shadow-lg"
                        : "text-black"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => handleHover(service.name)}
                  onHoverEnd={() => handleHover(null)}
                  onClick={() => handleClick(service.name)}
                >
                  <div className="flex items-center space-x-3">
                    <service.icon className="h-5 w-5" />
                    <span
                      className={`${
                        selectedService === service.name
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      {service.name}
                    </span>
                  </div>

                  {/* Badge number if exists */}
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

                  <div
                    className={`bg-gradient-to-br from-green-600 to-blue-500 rounded-lg h-6 w-6 flex items-center justify-center text-white font-bold ${
                      getRandomBadgeNumber() > 0 ? "" : "hidden"
                    }`}
                  >
                    {getRandomBadgeNumber()}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center mt-6">
          <img
            src="/path-to-user-image.jpg"
            alt="User Profile"
            className="rounded-full h-8 w-8"
          />
          <span className="ml-3 text-black">{session.user.name}</span>
        </div>
      </div>
    </>
  );
}

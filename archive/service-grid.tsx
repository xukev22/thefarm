import { services } from "@/lib/data";
import { motion } from "framer-motion";

interface ServiceGridProps {
  setSelectedService: (serviceName: string, shouldScroll: boolean) => void;
}

export default function ServiceGrid({ setSelectedService }: ServiceGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="transition duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <button
            onClick={() => setSelectedService(service.name.toLowerCase(), true)}
            className="w-48 h-64 bg-white shadow-md rounded-lg flex flex-col items-center justify-between hover:scale-105 hover:shadow-lg transition-transform p-2"
          >
            <div className="flex-grow flex flex-col justify-center items-center space-y-4">
              <service.icon className="text-farm-green w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold text-farm-brown">
                {service.name}
              </h2>
            </div>
            <div className="flex-shrink-0 mb-4">
              <p className="text-gray-700 text-center">{service.description}</p>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

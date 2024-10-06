import { services } from "@/lib/data";
import { motion } from "framer-motion";

interface ServiceGridProps {
  setSelectedService: (serviceName: string, shouldScroll: boolean) => void; // Added shouldScroll flag
}

export default function ServiceGrid({ setSelectedService }: ServiceGridProps) {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-farm-green mb-8">
        Our Farming Services
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="transition duration-300 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <button
              onClick={() =>
                setSelectedService(service.name.toLowerCase(), true)
              } // Pass true to force scroll
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:scale-105 hover:shadow-lg transition-transform h-64 w-48"
            >
              <service.icon className="text-farm-green w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-farm-brown">
                {service.name}
              </h2>
              <p className="text-gray-700 text-center">{service.description}</p>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

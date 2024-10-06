// components/ServiceGrid.tsx
import { services } from '@/lib/data';

export default function ServiceGrid() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-farm-green mb-8">Our Farming Services</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:bg-farm-yellow transition duration-300 ease-in-out"
          >
            <service.icon className="text-farm-green w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-farm-brown">{service.name}</h2>
            <p className="text-gray-700 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
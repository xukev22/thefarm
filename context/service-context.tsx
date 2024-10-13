import { createContext, useContext, useState, ReactNode } from "react";

// Define the context value type
interface ServiceContextType {
  selectedService: string;
  setSelectedService: (service: string) => void;
}

// Create the context
const ServiceContext = createContext<ServiceContextType>({
  selectedService: "Overview",
  setSelectedService: (service) => {
    throw new Error("global context setSelectedService is not yet initialized");
  },
});

// Custom hook to use the ServiceContext
export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};

// Provider component
export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedService, setSelectedService] = useState<string>("Overview");

  return (
    <ServiceContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </ServiceContext.Provider>
  );
};

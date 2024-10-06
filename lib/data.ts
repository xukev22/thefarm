import { LinkItem, Service } from "@/lib/types";
import { FaTractor, FaSeedling, FaEye } from "react-icons/fa";

export const links: readonly LinkItem[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Dashboard",
    link: "/dashboard",
  },
] as const;

export const services: readonly Service[] = [
  {
    name: "Tractor Service",
    description: "We provide the latest tractors for farm operations.",
    icon: FaTractor,
  },
  {
    name: "Planting Service",
    description: "Get seeds planted efficiently with our automated tools.",
    icon: FaSeedling,
  },
  {
    name: "Cattle Management",
    description: "Track and manage your cattle with our monitoring systems.",
    icon: FaEye,
  },
] as const;

import { LinkItem, ServiceGroup } from "@/lib/types";
import { AiFillDatabase } from "react-icons/ai";
import { FaFileInvoice, FaMapMarked } from "react-icons/fa";
import { FcSupport } from "react-icons/fc";
import { GrOverview } from "react-icons/gr";
import { IoAlertCircle } from "react-icons/io5";
import { MdPayments, MdSupportAgent } from "react-icons/md";
import { RiRemoteControlFill } from "react-icons/ri";

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

export const services: readonly ServiceGroup[] = [
  {
    header: "Services",
    services: [
      {
        name: "Overview",
        description: "See the quick facts.",
        icon: GrOverview,
      },
      {
        name: "Devices",
        description: "Add, update, or remove devices.",
        icon: RiRemoteControlFill,
      },
      {
        name: "Maps",
        description: "Add, update, or manage maps",
        icon: FaMapMarked,
      },
      {
        name: "Alerts",
        description: "View the history of alerts, and review outstanding ones.",
        icon: IoAlertCircle,
      },
      {
        name: "Data",
        description: "Display, sort, filter, and download the latest data.",
        icon: AiFillDatabase,
      },
      {
        name: "Support",
        description: "Contact us with any issues.",
        icon: MdSupportAgent,
      },
    ],
  },
  {
    header: "Payment",
    services: [
      {
        name: "Payments",
        description: "View payment history.",
        icon: MdPayments,
      },
      {
        name: "Invoices",
        description: "View invoice history.",
        icon: FaFileInvoice,
      },
    ],
  },
] as const;

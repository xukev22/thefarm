import { LinkItem } from "@/lib/types";

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

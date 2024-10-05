import { Session } from "next-auth";

export type WithChildren = {
  children: React.ReactNode;
};

export interface LinkItem {
  name: string;
  link: string;
}

export interface ProfileDB {
  id: number; // Corresponds to the "id" column (INT)
  name: string; // Corresponds to the "name" column (VARCHAR)
  email: string; // Corresponds to the "email" column (VARCHAR)
  username: string; // Corresponds to the "username" column (VARCHAR)
  password: string; // Corresponds to the "password" column (TEXT)
}
export interface FarmDB {
  id: number;
  name: string;
  profile_id: number;
  location: string;
}

export interface FarmHeaderDB {
  id: number;
  name: string;
}

export interface SessionProps {
  session: Session;
}

export interface CowDB {
  id: number;
  name: string;
  notes: string;
  farm_id: number;
}

export interface LoadingProps {
  message?: string; // Optional message prop, defaulting to 'Loading...'
}

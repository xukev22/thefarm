// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default `User` type to include custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
  }
}
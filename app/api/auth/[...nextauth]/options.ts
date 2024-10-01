import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from "pg";
import bcrypt from "bcrypt";

import { JWT } from "next-auth/jwt";
interface Profile {
  id: number; // Corresponds to the "id" column (INT)
  name: string; // Corresponds to the "name" column (VARCHAR)
  email: string; // Corresponds to the "email" column (VARCHAR)
  username: string; // Corresponds to the "username" column (VARCHAR)
  password: string; // Corresponds to the "password" column (TEXT)
}

// Initialize the connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // default PostgreSQL port
});

export const options: NextAuthOptions = {
  providers: [
    // TODO add google handling, lil diff
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Your username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        if (!credentials.username || !credentials.password) {
          throw new Error("Please provide both username and password");
        }

        console.log(credentials.username);

        // Fetch user from the database
        const res = await pool.query<Profile>(
          "SELECT * FROM profile WHERE username = $1",
          [credentials.username]
        );

        if (res.rowCount === 0) {
          throw new Error("No user found with the provided username");
        }

        // user returned must be at most one unique due to sql property
        const user = res.rows[0];

        // TODO
        // Compare hashed passwords
        // const isValid = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );
        const isValid = credentials.password === user.password;
        console.log(user.id.toString());
        // Return user object without sensitive fields
        return isValid
          ? {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              username: user.username,
            }
          : null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/signIn",
  // },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add user ID, username, name, and email to the session object
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add user info to the JWT token on sign-in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

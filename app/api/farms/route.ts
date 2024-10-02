import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // If you're using next-auth
import pool from "@/lib/db-pool";

export async function GET() {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized, session may have expired" },
      { status: 401 }
    );
  }

  try {
    // Query the database using the imported pool
    const { rows: farms } = await pool.query(
      "SELECT farm.id, farm.name FROM profile JOIN farm ON profile.id = farm.profile_id WHERE profile.id = $1",
      [session.user.id]
    );

    return NextResponse.json({ farms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching farms:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

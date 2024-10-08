import { options } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // If you're using next-auth
import pool from "@/lib/db-pool";
import { FarmDB, PingDB } from "@/lib/types";

export async function GET(
  request: Request,
  { params }: { params: { farmid: string } }
) {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized, session may have expired" },
      { status: 401 }
    );
  }

  const { farmid } = params; // Access the farmid from the URL

  try {
    // Query the database using the imported pool
    const { rows: farms } = await pool.query<FarmDB>(
      "SELECT * FROM farm WHERE farm.id = $1",
      [farmid]
    );

    if (farms.length === 0) {
      // No farm was found with the given farmid
      return NextResponse.json({ message: "Farm not found" }, { status: 404 });
    }

    console.log(typeof session.user.id);
    console.log(farms[0].profile_id);

    if (session.user.id !== farms[0].profile_id.toString()) {
      return NextResponse.json(
        { message: "Unauthorized, you do not own this farm" },
        { status: 401 }
      );
    }

    // TODO, return partial farm info
    // TODO, select partial cow info
    const { rows: pings } = await pool.query<PingDB>(
      `
SELECT cow.id AS cow_id, 
    cow.name AS cow_name, 
    lp.latitude, 
    lp.longitude, 
    lp.recorded_at
FROM cow
JOIN location_ping lp ON cow.id = lp.cow_id
JOIN farm ON cow.farm_id = farm.id
WHERE farm.id = $1
AND lp.recorded_at = (
    SELECT MAX(recorded_at)
    FROM location_ping
    WHERE cow_id = cow.id
)
ORDER BY cow.id;`,
      [farmid]
    );

    return NextResponse.json({ pings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching farms:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

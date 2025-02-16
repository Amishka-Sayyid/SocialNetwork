// app/api/saveProfile/route.js
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = await auth(req);

    const { username, about, imgsrc } = await req.json();

    // Insert the profile data into the database
    await db.query(
      `INSERT INTO userprofile (username, about, imgsrc, user_id) VALUES ($1, $2, $3, $4)`,
      [username, about, imgsrc, userId]
    );

    // Send success response
    return new Response(
      JSON.stringify({ message: "Profile saved successfully!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving profile:", error);
    return new Response(JSON.stringify({ message: "Error saving profile." }), {
      status: 500,
    });
  }
}

import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function UserProfilePage({ params }) {
  // Fetching userId from Clerk
  const { userId } = await auth();

  const { username } = params;

  try {
    const user = await db.query(
      `SELECT * FROM userprofile WHERE username = $1 AND user_id = $2`,
      [username, userId]
    );

    if (user.rows.length === 0) {
      return <h1>User not found</h1>;
    }

    const wrangledUser = user.rows[0];
    console.log(wrangledUser);

    return (
      <>
        <h1>User Profile Page</h1>

        <div>
          <h1>Username: {wrangledUser.username}</h1>
          <Image
            src={wrangledUser.imgsrc}
            alt="User profile image"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <h3>About: {wrangledUser.about}</h3>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <h1>Error fetching user profile</h1>;
  }
}

import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function UserProfilePage({ params }) {
  // Fetching userId from Clerk
  const { userId } = await auth();

  const { username } = params;

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
      <div className="flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-semibold text-emerald-600 mb-6">
          User Profile Page
        </h1>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <Image
              src={wrangledUser.imgsrc}
              alt="User profile image"
              width={150}
              height={200}
              style={{ objectFit: "contain" }}
              className="rounded-full "
            />
            <h2 className="text-xl font-semibold text-emerald-700">
              {wrangledUser.username}
            </h2>
          </div>

          <div className="text-center">
            <h3 className="text-lg text-gray-700 font-medium">About: </h3>
            <p className="text-gray-600 mt-2">{wrangledUser.about}</p>
          </div>
        </div>
      </div>
    </>
  );
}

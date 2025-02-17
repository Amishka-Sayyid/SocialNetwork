import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import bodystyles from "../body.module.css";
import userstyles from "../userprofile.module.css";
export default async function Profile() {
  const { userId } = await auth();
  const id = userId;

  const user = await db.query(
    `SELECT id, username FROM userprofile WHERE user_id = $1`,
    [id]
  );
  if (!user.rows.length) {
    return (
      <div
        className={`${userstyles.section} flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white`}
      >
        <h1 className={bodystyles.h1}>
          Welcome! Please create your profile to get started
        </h1>

        {/* link to Create Profile Link */}
        <Link
          href="/createProfile"
          className="text-black-500 hover:bg-green-500 w-full mt-6 p-1 rounded-md border-2 bg-emerald-200 text-center"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  const username = user.rows[0].username;

  return (
    <>
      <div
        className={`${userstyles.section} flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white`}
      >
        <h1 className={`${bodystyles.h1} text-black`}>
          Welcome to Your Profile, {username}!
        </h1>

        <h2 className={`${bodystyles.h2} text-black`}>
          Link to view your page is here
        </h2>

        <Link
          href={`/user/${username}`}
          className="text-black-500 hover:bg-blue-500 w-full mt-6 p-1 rounded-md border-2 bg-blue-200 text-center"
        >
          User Page
        </Link>

        <h2 className={`${bodystyles.h2} text-black`}>
          Manage your profile settings here.
        </h2>
        <nav className="flex items-center justify-center p-2 gap-3">
          {/* Update Profile Link */}
          <Link
            href={`/profile/${id}/update-profile`}
            className="text-emerald-500 hover:text-blue-700 w-full mt-6 p-1 rounded-md border-2 bg-white text-center"
          >
            Update Profile
          </Link>

          {/* Delete Profile Link */}
          <Link
            href={`/profile/${id}/delete-profile`}
            className="w-full hover:bg-red-500 mt-6 p-1 text-gray-800 rounded-md border-2 bg-red-300"
          >
            Delete Profile
          </Link>
        </nav>
      </div>
    </>
  );
}

export const metadata = {
  title: "Profile & Account Settings - Social Network",
  description:
    "Manage your account settings, update your profile, and control your posts on Social Network. Create, edit, and delete your content securely.",
};

import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import bodystyles from "../body.module.css";
import userstyles from "../userprofile.module.css";

export default async function Profile() {
  const { userId } = await auth();
  const id = userId;

  // Fetching user profile data
  const user = await db.query(
    `SELECT id, username FROM userprofile WHERE user_id = $1`,
    [id]
  );

  // showing this when user doesn't have profile
  if (!user.rows.length) {
    return (
      <div
        className={`${userstyles.section} flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white`}
      >
        <h1 className={bodystyles.h1}>
          Welcome! Please create your profile to get started
        </h1>

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
  const personalid = user.rows[0].id;

  // Fetching posts created by this user
  const posts = await db.query(
    `SELECT * FROM socialposts WHERE userid = $1 ORDER BY id DESC`,
    [personalid]
  );

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
          <Link
            href={`/profile/${id}/update-profile`}
            className="text-emerald-500 hover:text-blue-700 w-full mt-6 p-1 rounded-md border-2 bg-white text-center"
          >
            Update Profile
          </Link>

          <Link
            href={`/profile/${id}/delete-profile`}
            className="w-full hover:bg-red-500 mt-6 p-1 text-gray-800 rounded-md border-2 bg-red-300"
          >
            Delete Profile
          </Link>
        </nav>
      </div>

      <div
        className={`${userstyles.section} flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white min-w-full`}
      >
        <h1 className={`${bodystyles.h1} text-black`}>Your Posts</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.rows.length === 0 ? (
            <div>No posts available.</div>
          ) : (
            posts.rows.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-lg shadow-lg p-4 bg-white text-black"
              >
                <ul className="list-disc pl-5 mb-4">
                  <li className="font-semibold text-xl">{post.title}</li>
                </ul>

                <nav className="flex items-center justify-between gap-3">
                  <Link href={`/viewpost/${post.id}/updatepost`}>
                    <button className="bg-emerald-400 text-white p-2 rounded hover:bg-emerald-600">
                      Update Post
                    </button>
                  </Link>

                  <Link href={`/viewpost/${post.id}/deletepost`}>
                    <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                      Delete Post
                    </button>
                  </Link>
                </nav>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

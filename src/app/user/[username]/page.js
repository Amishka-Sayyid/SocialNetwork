export const metadata = {
  title: "User Profile - Social Network",
  description:
    "Welcome to your profile! Edit your information, share updates, and connect with others in the Social Network community.",
};

import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import bodystyles from "../../body.module.css";
import userstyles from "../../userprofile.module.css";
import { notFound } from "next/navigation";

export default async function UserProfilePage({ params }) {
  const { userId } = await auth();

  const { username } = params;

  const user = await db.query(`SELECT * FROM userprofile WHERE username = $1`, [
    username,
  ]);

  if (user.rows.length === 0) {
    notFound();
  }

  const wrangledUser = user.rows[0];

  const posts = await db.query(
    `SELECT * FROM socialposts WHERE userid = $1 ORDER BY id DESC`,
    [wrangledUser.id]
  );

  return (
    <main className="px-2 sm:px-4 md:px-6 lg:px-10 py-4 max-w-7xl mx-auto flex flex-col items-center">
      <div
        className={` ${userstyles.section} flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white`}
      >
        <h1
          className={` ${bodystyles.h1} text-2xl font-semibold text-emerald-600 mb-6`}
        >
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

          {/* showing this link only to owner of profile */}
          {userId === wrangledUser.user_id && (
            <div className="flex  items-center justify-center p-2 gap-3">
              <Link
                href={`/posts/${wrangledUser.id}`}
                className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 p-2 rounded text-black"
              >
                Add Post
              </Link>
              <Link
                href={`/profile`}
                className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 p-2 rounded text-black"
              >
                edit Post
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white">
        <h1>All Posts</h1>

        <div className="grid grid-cols-3 gap-4">
          {posts.rows.length === 0 ? (
            <div>No posts available.</div>
          ) : (
            posts.rows.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <Link href={`/viewpost/${post.id}`}>
                  <Image
                    src={
                      post.src ||
                      "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg"
                    }
                    alt={post.title || "No title available"}
                    width={200}
                    height={200}
                    style={{ objectFit: "cover" }}
                    className="w-full h-full"
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

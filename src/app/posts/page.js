export const metadata = {
  title: "All Posts - Social Network",
  description:
    "Browse through all posts shared by users on Social Network. Discover new content, engage with others, and be part of the conversation.",
};

import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import Image from "next/image";
import bodystyles from "../body.module.css";
import userstyles from "../userprofile.module.css";
export default async function PostsPage() {
  const { userId } = await auth();
  const id = userId;

  const posts = await db.query("SELECT * FROM socialposts ORDER BY id DESC");

  return (
    <main className="px-2 sm:px-4 md:px-6 lg:px-10 py-4 max-w-7xl mx-auto">
      <section
        className={`${userstyles.section} flex justify-center items-center flex-col min-h-screen bg-gray-100`}
      >
        <h1 className={`${bodystyles.h1} text-center text-black`}>
          Posts Page
        </h1>
        <p className="text-center text-lg text-gray-600 mt-4">
          Every Image Tells a Story.
        </p>
      </section>

      <div className="min-w-full flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white">
        <h1>all posts</h1>
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
                    width={300}
                    height={300}
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

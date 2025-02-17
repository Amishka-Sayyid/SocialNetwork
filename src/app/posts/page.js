import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import Image from "next/image";
export default async function PostsPage() {
  const { userId } = await auth();
  const id = userId;

  const user = await db.query(`SELECT id FROM userprofile WHERE user_id = $1`, [
    id,
  ]);

  if (!user.rows.length) {
    return <div>Profile not found. Please create one.</div>;
  }

  const personalid = user.rows[0].id;

  const posts = await db.query("SELECT * FROM socialposts");

  return (
    <>
      <div className="flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white">
        <h1>Posts Page</h1>
        <Link
          href={`/posts/${personalid}`}
          className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 p-2 rounded text-black"
        >
          add Post
        </Link>
      </div>
      <div className="flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white">
        <h1>all posts</h1>
        {posts.rows.length === 0 ? (
          <div>No posts available.</div>
        ) : (
          posts.rows.map((post) => (
            <div key={post.id}>
              <Image
                src={
                  post.src ||
                  "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg"
                }
                alt={post.title || "No title available"}
                width={200}
                height={200}
                objectFit="cover"
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}

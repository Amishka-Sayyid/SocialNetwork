import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";

export default async function PostsPage() {
  const { userId } = await auth();
  const id = userId;

  // Get user profile
  const user = await db.query(`SELECT id FROM userprofile WHERE user_id = $1`, [
    id,
  ]);
  if (!user.rows.length) {
    return <div>Profile not found. Please create one.</div>;
  }

  const personalid = user.rows[0].id;

  return (
    <>
      <h1>Posts Page</h1>
      <Link
        href={`/posts/${personalid}`}
        className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 p-2 rounded text-black"
      >
        Create Post
      </Link>
    </>
  );
}

export const metadata = {
  title: "Create Post - Social Network",
  description:
    "Create and share your thoughts with the Social Network community. Express yourself, post updates, and engage with others.",
};

import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import bodystyles from "../../body.module.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreatePost({ params }) {
  const { id } = params;
  const { userId } = await auth();

  // fetching username and clerkid
  const user = await db.query(
    `SELECT user_id ,username FROM userprofile WHERE id = $1`,
    [id]
  );
  if (!user.rows.length) {
    return <div>User profile not found.</div>;
  }
  const username = user.rows[0].username;
  const clerkId = user.rows[0].user_id;

  if (clerkId !== userId) {
    return <div>You are not authorized to create posts for this user.</div>;
  }

  // social post  form submission
  async function handleSubmit(formValues) {
    "use server";

    const title = formValues.get("title");
    const content = formValues.get("content");
    const src = formValues.get("src");
    const foreignkey = id;

    await db.query(
      `INSERT INTO socialposts (title, content, src, userid) VALUES ($1, $2, $3, $4)`,
      [title, content, src, foreignkey]
    );

    revalidatePath(`/posts`);
    redirect(`/posts`);
  }

  return (
    <main className="min-h-screen flex justify-center items-center flex-col w-full sm:w-[500px] max-w-lg p-12 m-2 rounded-lg shadow-lg bg-slate-100 mx-auto">
      <h1 className={`${bodystyles.h1} mb-8`}>Create Post</h1>

      <form action={handleSubmit}>
        <fieldset className="flex flex-col items-center border border-gray-300 rounded-md w-full p-6">
          <legend className="text-xl font-bold mb-4">Post:</legend>

          <label
            htmlFor="title"
            className="mb-1 self-start font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <label
            htmlFor="content"
            className="mb-1 self-start font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          ></textarea>

          <label
            htmlFor="src"
            className="mb-1 self-start font-medium text-gray-700"
          >
            Image Source URL:
          </label>
          <textarea
            id="src"
            name="src"
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          ></textarea>

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 text-white py-2 px-4 rounded-md"
          >
            Submit Post
          </button>
        </fieldset>
      </form>

      {/* Add top margin here to create space above this footer block */}
      <div className="mt-10 text-center">
        <h2 className="text-lg font-medium mb-2">Return to your profile</h2>
        <Link
          href="/profile"
          className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 px-4 py-2 rounded text-black"
        >
          Back to Profile
        </Link>
      </div>
    </main>
  );
}

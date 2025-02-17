export const metadata = {
  title: "Update Post - Social Network",
  description:
    "Edit your post on Social Network. Make changes, update content, and share your updated thoughts.",
};

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function updatePost({ params }) {
  const { id } = params;

  const postResult = await db.query(`SELECT * FROM socialposts WHERE id = $1`, [
    id,
  ]);

  if (!postResult.rows.length) {
    return <div>Post not found.</div>;
  }

  const post = postResult.rows[0];

  async function handleUpdate(formData) {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");
    const src = formData.get("src");

    await db.query(
      `UPDATE socialposts SET title = $1, content = $2, src = $3 WHERE id = $4`,
      [title, content, src, id]
    );

    revalidatePath(`/viewpost/${id}`);
    redirect(`/viewpost/${id}`);
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center py-12 px-4 sm:px-6 lg:px-8 mx-auto w-full">
        <div className="flex flex-col items-center justify-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-white">
          <h1 className="text-center text-2xl font-semibold mb-8 text-emerald-700">
            Update Post
          </h1>

          <form
            action={handleUpdate}
            className="flex flex-col justify-center items-center border-2 border-solid border-gray-500 w-full max-w-3xl p-8 rounded-lg shadow-lg bg-white"
          >
            <label htmlFor="title" className="text-lg font-medium mb-2">
              Post title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Write the title here"
              defaultValue={post.title}
              required
              className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100"
            />
            <label htmlFor="content" className="text-lg font-medium mb-2">
              Content:
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="Write the content here"
              defaultValue={post.content}
              required
              className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100 h-32"
            />
            <label htmlFor="src" className="text-lg font-medium mb-2">
              Image source URL:
            </label>
            <textarea
              name="src"
              id="src"
              placeholder="Paste the image URL here"
              defaultValue={post.src}
              className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100 h-32"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 mt-4 text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-500"
            >
              Update Post
            </button>
          </form>
        </div>
        <h3 className="mb-4">
          Click below to navigate back to your profile page
        </h3>
        <Link
          href={`/profile`}
          className="text-black-500 hover:bg-blue-500 w-full mt-6 p-1 rounded-md border-2 bg-blue-200 text-center"
        >
          Go to Profile
        </Link>
      </div>
    </>
  );
}

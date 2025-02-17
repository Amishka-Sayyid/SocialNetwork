export const metadata = {
  title: "Delete Profile - Social Network",
  description:
    "Are you sure you want to delete your profile? This action will remove your personal information, posts, and data from Social Network permanently. Take a moment to think it over.",
};

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DeleteUser({ params }) {
  const slug = params;

  async function handleDelete() {
    "use server";

    await db.query(`DELETE FROM userprofile WHERE user_id = $1`, [slug.id]);

    revalidatePath("/");
    redirect("/");
  }
  return (
    <>
      <div className="flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8  rounded-lg shadow-lg bg-white">
        <h1>are you sure you want to delete your account?</h1>
        <h2>To proceed, please click the button below.</h2>
        <form action={handleDelete}>
          <button
            type="submit"
            className="flex hover:bg-red-600 h-8 hover:text-white bg-red-100 p-1 rounded text-black items-center"
          >
            Delete
          </button>
        </form>

        <h3 className="mb-4">
          or Click below to navigate back to your profile page
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

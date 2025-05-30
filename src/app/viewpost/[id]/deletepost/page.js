export const metadata = {
  title: "Delete Post - Social Network",
  description:
    "Are you sure you want to delete this post? This action is permanent.",
};

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Deletepost({ params }) {
  const slug = params;
  async function handleDelete() {
    "use server";

    await db.query(`DELETE FROM socialposts WHERE id = $1`, [slug.id]);

    revalidatePath("/profile");
    redirect("/profile");
  }
  return (
    <main className="min-h-screen flex justify-center items-center flex-col w-full sm:w-[500px] max-w-lg p-12 m-2 rounded-lg shadow-lg bg-red-100 mx-auto">
      <h1>Would you like to remove this post from your collection?</h1>
      <h2>To proceed, please click the button below.</h2>
      <form action={handleDelete}>
        <button
          type="submit"
          className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center"
        >
          Delete
        </button>
      </form>
    </main>
  );
}

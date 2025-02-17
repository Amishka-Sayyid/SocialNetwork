import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteMovie({ params }) {
  const slug = params;
  async function handleDelete() {
    "use server";

    await db.query(`DELETE FROM socialposts WHERE id = $1`, [slug.id]);

    revalidatePath("/profile");
    redirect("/profile");
  }
  return (
    <>
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
    </>
  );
}

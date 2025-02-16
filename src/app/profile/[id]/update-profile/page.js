import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function updateProfile({ params }) {
  const slug = await params;

  const user = await db.query(`SELECT * FROM userprofile WHERE user_id = $1`, [
    slug.id,
  ]);

  const wrangledUser = user.rows[0];
  console.log(wrangledUser);

  async function handleUpdate(formData) {
    "use server";

    //access the input value first

    const username = formData.get("username");
    const about = formData.get("about");
    const imgsrc = formData.get("imgsrc");

    await db.query(
      `UPDATE userprofile SET username = $1, about = $2, imgsrc = $3 WHERE user_id = $4`,
      [username, about, imgsrc, slug.id]
    );

    revalidatePath("/profile");

    redirect("/profile");
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center w-full sm:w-[500px] max-w-lg p-8  rounded-lg shadow-lg bg-white">
        <h1 className="text-center text-2xl font-semibold mb-8 text-emerald-700">
          update your profile
        </h1>

        <form
          action={handleUpdate}
          className="flex flex-col justify-center items-center border-2 border-solid border-gray-500 w-full max-w-3xl p-8 rounded-lg shadow-lg bg-white"
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={wrangledUser.username}
            required
            className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100   "
          />

          <label htmlFor="about">About: </label>
          <textarea
            name="about"
            id="about"
            required
            defaultValue={wrangledUser.about}
            className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100   "
          />

          <label htmlFor="imgsrc">Profile Image URL: </label>
          <textarea
            name="imgsrc"
            id="imgsrc"
            required
            defaultValue={wrangledUser.imgsrc}
            className="w-full p-3 mb-4 text-gray-800 rounded-md border-2 border-emerald-100   "
          />

          <button
            type="submit"
            className="bg-emerald-500 border-2 p-1 m-4 hover:bg-emerald-400 rounded-lg"
          >
            update
          </button>
        </form>
      </div>
    </>
  );
}

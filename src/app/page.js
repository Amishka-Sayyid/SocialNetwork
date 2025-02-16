import bodystyles from "./body.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div
        className={`${bodystyles.section} flex justify-center flex-col items-center w-full sm:w-[500px] md:w-[600px] lg:w-[800px] p-8 rounded-lg shadow-lg bg-white`}
      >
        <h1 className={bodystyles.h1}>
          Every Image Tells a Story — What&apos;s Yours?
        </h1>

        <h2 className={bodystyles.h2}>
          Share your moments, ideas, and creativity with the world. Whether it’s
          a snapshot of life or a masterpiece in the making, this is your space
          to express, inspire, and connect.
        </h2>
      </div>

      <div
        className={`${bodystyles.section} flex justify-center flex-col items-center w-full sm:w-[500px] md:w-[600px] lg:w-[800px] p-8 rounded-lg shadow-lg bg-white`}
      >
        <h1 className={bodystyles.h1}>Navigate Your Next Adventure</h1>
        <nav className="flex  items-center justify-center p-2 gap-3">
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 p-2 rounded text-black"
          >
            Homepage
          </Link>
          <Link
            href="/posts"
            className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 p-2 rounded text-black"
          >
            All Posts
          </Link>
          <Link
            href="/profile"
            className="bg-gray-100 hover:bg-gray-300 transition-colors duration-200 p-2 rounded text-black"
          >
            Profile
          </Link>
        </nav>
      </div>
    </>
  );
}

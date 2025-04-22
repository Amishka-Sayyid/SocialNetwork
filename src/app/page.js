export const metadata = {
  title: "Social Network - Homepage",
  description:
    "Welcome to Social Network! Connect with friends, share moments, and discover new people in a vibrant online community.",
};

import bodystyles from "./body.module.css";
import Link from "next/link";
import userstyles from "./userprofile.module.css";
export default function HomePage() {
  return (
    <>
      <main
        className={`${bodystyles.section} h-[80vh]  text-[#d1e0e5] text-center flex flex-col justify-center items-center `}
      >
        <h1
          className={`${bodystyles.h1} text-5xl font-semibold mb-4 drop-shadow-lg `}
        >
          Every Image Tells a Story — What&apos;s Yours?
        </h1>
        <h2 className={`${bodystyles.h2} text-2xl  mb-2 `}>
          Share your moments, ideas, and creativity with the world. Whether it’s
          a snapshot of life or a masterpiece in the making, this is your space
          to express, inspire, and connect.
        </h2>
        <h1
          className={`${bodystyles.h1} text-2xl font-semibold mb-4 drop-shadow-lg `}
        >
          Navigate Your Next Adventure
        </h1>
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
      </main>
    </>
  );
}

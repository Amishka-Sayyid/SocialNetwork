"use client";

import { SignUp, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { revalidatePath, redirect } from "next/cache";

export default function SignUpPage() {
  const { user } = useClerk();

  useEffect(() => {
    if (user) {
      revalidatePath("/createProfile");
      redirect("/createProfile");
    }
  }, [user]);

  return (
    <>
      <div
        className={`antialiased grid grid-rows-[minmax(1rem, auto)_1fr_minmax(1rem, auto)] items-center justify-items-center w-full p-0 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <h1>Welcome to The Social Network!</h1>
        <h2>Sign up, please, new user!</h2>
        <SignUp />
      </div>
    </>
  );
}

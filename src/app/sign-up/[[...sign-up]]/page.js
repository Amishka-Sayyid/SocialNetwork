"use client";

import { SignUp, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { user } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

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

"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div
        className={`antialiased grid grid-rows-[minmax(1rem, auto)_1fr_minmax(1rem, auto)] items-center justify-items-center w-full p-0 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <h1>Welcome to The Social Network!</h1>
        <h2>Sign in to continue</h2>
        <SignIn />
      </div>
    </>
  );
}

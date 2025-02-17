export const metadata = {
  title: "Sign Up - Social Network",
  description:
    "Create an account on Social Network. Join our community, share your thoughts, and connect with friends and family.",
};

("use client");

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
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

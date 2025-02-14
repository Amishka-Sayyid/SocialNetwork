import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const { user } = useClerk();

  useEffect(() => {
    if (user) {
      redirect("/createProfile");
    }
  }, [user]);
  return (
    <>
      <div
        className={`antialiased grid grid-rows-[minmax(1rem, auto)_1fr_minmax(1rem, auto)] items-center justify-items-center w-full p-0 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <h1>Welcome to The social Network!</h1>
        <h2>Sign in, please!</h2>
        <SignIn />
      </div>
    </>
  );
}

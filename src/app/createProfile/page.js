"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs"; // To access the logged-in user
import { createClient } from "@supabase/supabase-js";

export default function CreateProfile() {
  const { user } = useUser(); // Clerk user object
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  // Create a Supabase client instance
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  // Form submission handler to save user profile details to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("No user found!");
      return;
    }

    try {
      // Insert data into userProfile table
      const { data, error } = await supabase.from("userProfile").upsert({
        user_id: user.id, // Using Clerk's user ID
        username: username,
        about: about,
        imgSrc: imgSrc,
      });

      // Log the full response for debugging purposes
      console.log("Supabase Response Data:", data);
      console.log("Supabase Error:", error);

      // Handle error if present
      if (error) {
        console.error("Error inserting profile:", error);
        alert(`Error: ${error.message || "An unknown error occurred"}`);
      } else {
        alert("Profile saved successfully!");
        window.location.reload();
      }
    } catch (error) {
      // Catch any additional errors that might occur
      console.error("Error during profile creation:", error);
      alert("An error occurred while creating the profile. Please try again.");
    }
  };

  return (
    <div className="flex justify-center flex-col items-center ">
      <h1>Create Your User Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center border-2 border-solid border-gray-500 w-[25rem] p-6 rounded-lg"
      >
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-emerald-600"
          required
        />

        <label htmlFor="about">About: </label>
        <textarea
          type="text"
          name="about"
          id="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="text-emerald-600 h-20"
        />

        <label htmlFor="imgSrc">Profile Image URL: </label>
        <textarea
          type="text"
          name="imgSrc"
          id="imgSrc"
          value={imgSrc}
          onChange={(e) => setImgSrc(e.target.value)}
          className="text-emerald-600 h-20"
        />

        <button
          type="submit"
          className="bg-emerald-500 border-2 p-1 m-4 hover:bg-emerald-400 rounded-lg"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

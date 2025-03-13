import React from "react";
import SignupForm from "./signupForm";

const Signup = () => {
  return (
    <main className="h-full w-full p-16 flex gap-10">
      <aside className="grow">
        <h1 className="text-white text-4xl">Vibe</h1>
      </aside>
      <aside className="flex items-center">
        <SignupForm />
      </aside>
    </main>
  );
};

export default Signup;

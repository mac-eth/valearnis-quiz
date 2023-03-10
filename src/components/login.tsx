import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
const Login: React.FC = () => {
  const session = useSession();

  if (session?.data?.user?.name) {
    return (
      <div className="flex gap-2">
        <div className="rounded-md bg-teal-600 px-4 py-2 text-base font-semibold leading-6 text-white duration-300 hover:bg-black hover:bg-discord/80">
          {`Logged in as ${session.data.user?.name}`}
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-md bg-discord px-4 py-2 text-base font-semibold leading-6 text-white duration-300 hover:bg-black hover:bg-discord/80"
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <button
          className="flex h-20 w-60 items-center justify-center rounded-md bg-discord  px-4 py-2 text-base font-semibold leading-6 text-black duration-300 hover:bg-discord/80"
          onClick={() => signIn('discord')}
        >
          Login with Discord
        </button>
      </div>
    );
  }
};

export default Login;

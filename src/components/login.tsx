import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
const Login: React.FC = () => {
  const session = useSession();
  

  if (session?.data?.user?.name) {
    return (
      <div className="flex gap-2">
        <div className="rounded-md bg-teal-600 px-4 py-2 text-base font-semibold leading-6 text-white duration-300 hover:bg-black hover:bg-discord/80">
          {`Logged in as ${session.data.user?.name}`}
        </div>
        <Link
          href="/api/auth/signout"
          className="rounded-md bg-discord px-4 py-2 text-base font-semibold leading-6 text-white duration-300 hover:bg-black hover:bg-discord/80"
        >
          Logout
        </Link>
      </div>
    );
  } else {
    return (
        <div className="flex justify-center">
      <button
        onClick={() => signIn("discord")}
        className="flex rounded-md bg-discord w-60 h-20 justify-center items-center  px-4 py-2 text-base font-semibold leading-6 text-black duration-300 hover:bg-discord/80"
      >
        Login with Discord
      </button>
      </div>
    );
  }
};

export default Login;

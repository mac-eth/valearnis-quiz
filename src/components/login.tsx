import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
const Login: React.FC = () => {
  const discordAuthURL =
    "https://discord.com/api/oauth2/authorize?client_id=1069266927513505862&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email";
  const session = useSession();

  if (session?.data?.user?.name) {
    return (
      <div className="flex gap-2">
        <div className="rounded-md bg-teal-600 px-4 py-2 text-base font-semibold leading-6 text-white duration-300 hover:bg-black hover:bg-discord/80">
          {`Logged in as ${session.data.user.name}`}
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
      <Link
        href={discordAuthURL}
        className="flex rounded-md bg-discord w-60 h-20 justify-center items-center  px-4 py-2 text-base font-semibold leading-6 text-black duration-300 hover:bg-black hover:bg-discord/80"
      >
        Login with Discord
      </Link>
      </div>
    );
  }
};

export default Login;

// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useAuth } from "../context/UserContext";

const Header: React.FC = () => {
  const router = useRouter();
  const { signOut, signIn, isAuth } = useAuth();

  // const isActive: (pathname: string) => boolean = (pathname) =>
  //   router.pathname === pathname;

  // const { data: session, status } = useSession();

  // let left = <div className="left"></div>;

  // let right = null;

  // if (!session) {
  //   right = (
  //     <div className="ml-auto ">
  //       <Link href="/api/auth/signin">
  //         <Image
  //           className="cursor-pointer"
  //           src="/pictos/log-in.png"
  //           width={50}
  //           height={50}
  //           alt="Log in"
  //         />
  //       </Link>
  //     </div>
  //   );
  // }

  // if (session) {
  //   right = (
  //     <div className="ml-auto flex">
  //       <button onClick={() => signOut()}>
  //         <Image
  //           src="/pictos/turn-off.png"
  //           width={30}
  //           height={30}
  //           alt="Log out"
  //         />
  //       </button>
  //     </div>
  //   );
  // }

  let log = null;

  if (isAuth) {
    log = (
      <button onClick={signOut}>
        <Image
          src="/pictos/turn-off.png"
          width={30}
          height={30}
          alt="Log out"
        />
      </button>
    );
  }

  if (!isAuth) {
    log = (
      <Link href="/auth/signin">
        <Image
          className="cursor-pointer"
          src="/pictos/log-in.png"
          width={50}
          height={50}
          alt="Log in"
        />
      </Link>
    );
  }

  return (
    <nav className="min-h-[90px] flex justify-end px-6 pt-6 pb-4 border-b-2 border-black bg-primary sticky top-0 ">
      {/* {left}
      {right} */}
      {log}
    </nav>
  );
};

export default Header;

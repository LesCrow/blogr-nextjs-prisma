// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <Image
          className="cursor-pointer"
          src="/pictos/mov.png"
          width={40}
          height={40}
        />
      </Link>
    </div>
  );

  let right = null;

  // if (status === "loading") {
  //   left = (
  //     <div className="left">
  //       <Link href="/">
  //         <a className="bold" data-active={isActive("/")}>
  //           Feed
  //         </a>
  //       </Link>
  //       {/* <style jsx>{`
  //         .bold {
  //           font-weight: bold;
  //         }

  //         a {
  //           text-decoration: none;
  //           color: var(--geist-foreground);
  //           display: inline-block;
  //         }

  //         .left a[data-active="true"] {
  //           color: gray;
  //         }

  //         a + a {
  //           margin-left: 1rem;
  //         }
  //       `}</style> */}
  //     </div>
  //   );
  //   right = (
  //     <div className="right">
  //       <p>Validating session ...</p>
  //       {/* <style jsx>{`
  //         .right {
  //           margin-left: auto;
  //         }
  //       `}</style> */}
  //     </div>
  //   );
  // }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link href="/api/auth/signin">
          <Image
            className="cursor-pointer"
            src="/pictos/log-in.png"
            width={40}
            height={40}
          />
        </Link>
      </div>
    );
  }

  if (session) {
    right = (
      <div className="flex w-full justify-between">
        <p className="pl-2">
          {session.user.name} <br /> ({session.user.email})
        </p>
        <button onClick={() => signOut()}>
          <Image src="/pictos/turn-off.png" width={30} height={30} />
        </button>
        {/* <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link> */}

        {/* <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style> */}
      </div>
    );
  }

  return (
    <nav className="flex p-4 item">
      {left}
      {right}
    </nav>
  );
};

export default Header;

import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";

type Props = {};

export default function SignIn({}: Props) {
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1>SIGN IN</h1>

      <div className="flex flex-col items-center mt-8">
        <p>Pas encore inscrit ?</p>
        <Link
          href="/auth/signup"
          className="mt-4 bg-secondary px-4 py-2 rounded-full"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
}

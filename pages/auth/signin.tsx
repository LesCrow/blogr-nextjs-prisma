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

  return <div>SignIn</div>;
}

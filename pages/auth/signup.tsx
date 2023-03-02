import { User } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";

type Props = {};

function SignUp({}: Props) {
  const urlPost = "/auth/signup";
  const { register, handleSubmit } = useForm<User>();

  const onSubmit = (user: User) => {
    axiosInstance.post(urlPost, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full items-center mt-16 space-y-2 text-black">
          <input {...register("name")} placeholder="My username" />
          <input {...register("email")} placeholder="My email" />
          <input {...register("password")} placeholder="password" />
          <button type="submit" className="bg-secondary rounded-full px-4 py-2">
            Let&apos;s sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

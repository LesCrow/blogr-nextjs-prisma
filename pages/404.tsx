import Image from "next/image";
import React, { useState } from "react";

type Props = {};

export default function FourOFour({}: Props) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  setTimeout(() => {
    setText1("404");
  }, 1000);

  setTimeout(() => {
    setText2("Not Found");
  }, 1500);

  //   const myFunction = () => {
  //     setTimeout(() => {
  //       return (
  //         <p className="text-8xl absolute top-[50%] text-center w-full text-primary">
  //           404 <br />
  //           <span className="text-6xl">Not Found</span>
  //         </p>
  //       );
  //     }, 1000);
  //   };

  return (
    <div className="grid-cols-5">
      <Image
        src="/gif/vincentVega.gif"
        width={1000}
        height={1000}
        alt="404"
        className="w-full h-screen object-cover md:object-fill"
      />
      <p className="text-8xl absolute top-[50%] text-center w-full text-primary ">
        {text1} <br />
        <span className="text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white">
          {text2}
        </span>
      </p>
    </div>
  );
}

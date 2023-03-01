import Image from "next/image";
import React from "react";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="flex justify-center mt-16">
      <Image src="/gif/loader.gif" width={200} height={200} alt="Loader" />
    </div>
  );
}

import React from "react";

type Props = {
  content: string;
  style?: string;
  handleClick?: () => void;
};
//text-secondary

export default function Button({ content, handleClick, style }: Props) {
  return (
    <>
      <button
        className={`bg-[#292E35] ${style} rounded-full w-fit px-6 py-1 mx-auto`}
        onClick={handleClick}
        type="submit"
      >
        {content}
      </button>
    </>
  );
}

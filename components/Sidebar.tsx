import React from "react";
import { slide as Menu } from "react-burger-menu";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <Menu>
      <p>Home</p>
      <p>2</p>
      <p>3</p>
    </Menu>
  );
}

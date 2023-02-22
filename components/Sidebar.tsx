import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(!menuOpen);
  };

  console.log(menuOpen);

  return (
    <Menu
      isOpen={menuOpen}
      onOpen={handleCloseMenu}
      customBurgerIcon={
        <Image
          className="cursor-pointer"
          src="/pictos/mov.png"
          width={40}
          height={40}
          alt="Menu"
        />
      }
    >
      <div className="space-y-4 text-2xl">
        <Link onClick={handleCloseMenu} href="/">
          HOME
        </Link>
      </div>
    </Menu>
  );
}

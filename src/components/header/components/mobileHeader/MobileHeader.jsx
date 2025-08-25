"use client";
import Link from "next/link";
import IconLogo from "@images/logo.svg";
import { BurgerButton, HeaderNav } from "@components/header/components";
import { useEffect, useState } from "react";
import classNames from "classnames";

const MobileHeader = () => {
  const [opened, setOpened] = useState(false); // State burger menu
  const headerClass = classNames("header", "header--mobile", {
    "header--opened": opened,
  });

  useEffect(() => {
    if (document.querySelector(".app")) {
      opened
        ? (document.querySelector(".app").style.overflow = "hidden")
        : (document.querySelector(".app").style.overflowY = "scroll");
    }
  }, []);

  return (
    <header className={headerClass}>
      <div className="header__wrapper">
        {/* Logo */}
        <Link onClick={() => setOpened(false)} href="/">
          <IconLogo className="header__logo" aria-label="EasyLiker" />
        </Link>

        {/* Burger button */}
        <BurgerButton setOpened={setOpened} isOpened={opened} />
      </div>

      {/* Навигация */}
      <HeaderNav setOpened={setOpened} />
    </header>
  );
};

export default MobileHeader;

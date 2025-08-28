import IconLogo from "@images/logo.svg";
import { Button } from "flowbite-react";
import { PropTypes } from "prop-types";
import { HeaderNav } from "./components";
import "./assets/styles/header.scss";
import Link from "next/link";
import LogoutBtn from "@components/header/components/logoutBtn/LogoutBtn";
import MobileHeader from "@components/header/components/mobileHeader/MobileHeader";

/**
 * Компонент шапки страницы
 * @returns {JSX.Element}
 * @constructor
 */
const Header = async ({
  typeButtonContacts = "secondaryTransparent",
  isMobile,
}) => {
  return (
    <>
      {isMobile ? (
        <MobileHeader />
      ) : (
        <header className="header">
          {/* Logo */}
          <div className="sm:w-[200px]">
            <Link href="/">
              <IconLogo className="header__logo" aria-label="EasyLiker" />
            </Link>
          </div>

          {/* Навигация */}
          <HeaderNav isMobile={isMobile} />

          {/* Actions */}
          <div className="header__actions sm:w-[200px]">
            {/* Контакты */}
            <Link href="/info">
              <Button
                className="py-[14px] px-[25px] h-[44px]"
                color={typeButtonContacts}
                size="custom"
              >
                Контакты
              </Button>
            </Link>

            {/* Выход из аккаунта */}
            <LogoutBtn />
          </div>
        </header>
      )}
    </>
  );
};

Header.propTypes = {
  props: PropTypes.object,
};

export default Header;

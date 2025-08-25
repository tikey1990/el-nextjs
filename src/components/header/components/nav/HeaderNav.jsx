"use client";
import { useAuth, useAppDispatch } from "@hooks";
import { ModalPromo } from "@components";
import { VAR_LINK_ROUTES } from "@vars";
import { utilAuthLogout } from "@utils";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";

import { navData } from "../../config";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Компонент навигации в шапке
 * @returns {JSX.Element}
 * @constructor
 */
export const HeaderNav = ({ setOpened = () => undefined, isMobile }) => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [modalPromo, setModalPromo] = useState(false);
  const pathname = usePathname();

  /**
   * Слушатель клика на элемент меню
   */
  const handleClickItemMenu = (elem) => {
    if (elem.name === "Промокоды") {
      setModalPromo(true);
    }

    setOpened(false);
  };

  /**
   * Генерация навигации
   * @returns {unknown[]}
   */
  const generateMenu = () => {
    return navData(isMobile).map((elem, index) => (
      <Link
        className={classNames("header__nav__item", {
          active: pathname === elem?.routeName,
        })}
        href={elem.name === "Промокоды" ? "#" : elem.link}
        onClick={() => handleClickItemMenu(elem)}
        key={index}
      >
        <span className="header__nav-link">{elem.name}</span>
      </Link>
    ));
  };

  return (
    <menu className="header__nav max-sm:w-full">
      <ModalPromo setOpenModal={setModalPromo} openModal={modalPromo} />

      <div className="flex flex-col sm:gap-10 sm:flex-row w-full">
        {generateMenu()}

        {isMobile && !isAuth && (
          <>
            <Link
              className={classNames("header__nav__item button", {
                active: pathname === VAR_LINK_ROUTES.login,
              })}
              onClick={handleClickItemMenu}
              href={VAR_LINK_ROUTES.login}
            >
              <p className="header__nav-link">Войти</p>
            </Link>

            <Link
              className={classNames("header__nav__item button", {
                active: pathname === VAR_LINK_ROUTES.register,
              })}
              onClick={handleClickItemMenu}
              href={VAR_LINK_ROUTES.register}
            >
              <p className="header__nav-link">Регистрация</p>
            </Link>
          </>
        )}
      </div>

      {isMobile && isAuth && (
        <div
          onClick={() => {
            utilAuthLogout(dispatch, router.push);
            setOpened(false);
          }}
          className="w-full"
        >
          <li className="header__nav__item">
            <p className="header__nav-link">Выход</p>
          </li>
        </div>
      )}
    </menu>
  );
};

HeaderNav.propTypes = {
  /**
   * Изменения state burger menu
   */
  setOpened: PropTypes.func,
};

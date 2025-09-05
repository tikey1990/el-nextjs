"use client";
import IconLogo from "@images/logo.svg";
import { useAuth } from "@hooks";
import { Button } from "flowbite-react";

import "./styles/footer.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Компонент подвала
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
  const pathname = usePathname();
  const { isAuth } = useAuth();

  // Скрываем футер на страницах авторизации и регистрации
  const isShowFooter =
    pathname !== "/auth" &&
    pathname !== "/register" &&
    pathname !== "/login" &&
    pathname !== "/agreement" &&
    pathname !== "/privacy" &&
    pathname !== "/offer";

  return (
    <>
      {!isAuth && isShowFooter && (
        <footer className="footer">
          <div className="footer__wrapper">
            <div className="footer__content">
              {/* Логотип */}
              <Link href="/">
                <IconLogo className="footer-logo" />
              </Link>

              {/* Кнопки */}
              <div className="footer__buttons">
                {/* Регистрация */}
                <Link className="max-sm:w-[50%]" href="/register">
                  <Button
                    className="py-[19px] px-[40px] max-sm:w-full"
                    color="secondaryTransparent"
                    size="custom"
                  >
                    Регистрация
                  </Button>
                </Link>

                {/* Авторизация */}
                <Link className="max-sm:w-[50%]" href="/auth">
                  <Button
                    className="py-[19px] px-[40px] max-sm:w-full"
                    color="secondaryTransparent"
                    size="custom"
                  >
                    Вход
                  </Button>
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <span className="footer-copyright inline-flex flex-col gap-1">
              © EasyLiker 2019-2024. Все права защищены.
              <a className="underline" href="agreement">
                Пользовательское соглашение
              </a>
              <a className="underline" href="privacy">
                Политка конфидециальности
              </a>
              <a className="underline" href="offer">
                Оферта
              </a>
              <br />
              <p>
                "Instagram, Facebook, Twitter - запрещённые в России соцсети.
                Meta - признана экстремистской организацией.
              </p>
              <p>Деятельность на территории РФ запрещена."</p>
            </span>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;

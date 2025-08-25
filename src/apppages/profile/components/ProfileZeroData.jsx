import { VAR_LINK_ROUTES } from "@vars";
import { Button } from "flowbite-react";
import PropTypes from "prop-types";

import { IconOrdersEmpty } from "../assets/icons";
import Link from "next/link";

/**
 * Компонент пустых заказов на аккаунте
 * @returns {JSX.Element}
 * @param {string} page - Страница
 * @param {string} text - Текст компонента
 * @constructor
 */
export const ProfileZeroData = ({ page, text }) => {
  // Ссылка кнопки
  const linkButton =
    page === VAR_LINK_ROUTES.orders
      ? `/${VAR_LINK_ROUTES.services}`
      : `/${VAR_LINK_ROUTES.profile}/${VAR_LINK_ROUTES.deposit}`;
  // Текст кнопки
  const textButton =
    page === VAR_LINK_ROUTES.orders ? "Заказать" : "Пополнить баланс";

  return (
    <div className="w-full flex flex-col z-[50] gap-6 max-sm:py-10 sm:gap-10 items-center bg-white rounded-2xl justify-center h-[calc(100vh-56px-350px)] sm:h-[calc(100%-124px)]">
      <IconOrdersEmpty />

      <p className="text-2xl font-pn-extraboldit max-sm:text-center sm:text-[32px] text-gray-600">
        {text}
      </p>

      <Link href={linkButton}>
        <Button className="h-full w-full" color="primary" size="sm">
          {textButton}
        </Button>
      </Link>
    </div>
  );
};

ProfileZeroData.propTypes = {
  /**
   * Страница
   */
  page: PropTypes.string.isRequired,

  /**
   * Текст компонента
   */
  text: PropTypes.string,
};

ProfileZeroData.defaultProps = {
  text: "Тут еще ничего нет :(",
};

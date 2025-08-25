import { useSelector } from "react-redux";
import { VAR_LINK_ROUTES } from "@vars";
import { useAuth, useTypeDevice } from "@hooks";

import { IconPlus } from "../assets/icons";
import Link from "next/link";

/**
 * Компонент элемента пополнения баланса
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideBalRefill = () => {
  const { isAuth } = useAuth();
  const { isMobile } = useTypeDevice();

  return (
    <>
      {isAuth && !isMobile && (
        <Link
          href={`/${VAR_LINK_ROUTES.profile}/${VAR_LINK_ROUTES.deposit}`}
          className="aside__container container--bal-refill"
        >
          <div className="container__item">
            <IconPlus />
            <p className="container__item-text">Пополнить баланс</p>
          </div>
        </Link>
      )}
    </>
  );
};

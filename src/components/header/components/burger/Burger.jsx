import { Button } from "@components";
import PropTypes from "prop-types";

import IconBurger from "../../assets/icons/icon-burger.svg";
import IconClose from "../../assets/icons/icon-close.svg";
import "./styles/burger.scss";

export const BurgerButton = ({ setOpened, isOpened }) => {
  /**
   * Слушатель на нажатии на бургер меню
   */
  const handleClickBurger = () => setOpened(!isOpened);

  return (
    <Button
      className="header__actions__burger"
      onClick={handleClickBurger}
      aria-label="Menu"
      variant="custom"
    >
      {isOpened ? <IconClose /> : <IconBurger />}
    </Button>
  );
};

BurgerButton.propTypes = {
  /**
   * Проставляем значение open
   */
  setOpened: PropTypes.func,

  /**
   * Открыто ли меню
   */
  isOpened: PropTypes.bool,
};

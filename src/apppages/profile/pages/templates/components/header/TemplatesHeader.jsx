import { TempaltesModal } from "@apppages/profile/pages/templates/components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { setCreateTemplate } from "@features";
import { Button } from "flowbite-react";
import { utilScrollTop } from "@utils";
import classnames from "classnames";
import { useState } from "react";

import { IconTemplatesHeaderAdd } from "./icons";

/**
 * Компонент шапки страницы шаблонов
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesHeader = () => {
  const dispatch = useDispatch();
  const has_premium_subscription = useSelector(
    (state) => state.profileSettings.has_premium_subscription,
  );
  const [openModal, setOpenModal] = useState(false);

  /**
   * Слушатель клика по кнопке добавления шаблона
   */
  const handleClickAddTemplate = () => {
    utilScrollTop();
    dispatch(setCreateTemplate({ type: "create" }));
  };

  const classButton = classnames("[&>span]:items-center [&>span]:gap-2", {
    "!bg-gradient-gray": !has_premium_subscription,
  });

  return (
    <>
      <TempaltesModal setOpenModal={setOpenModal} openModal={openModal} />

      <div className="flex xs:justify-between justify-center max-sm:bg-white items-center flex-wrap max-sm:py-[25px] max-xs:gap-3 max-sm:px-5 max-sm:shadow-content max-sm:rounded-2xl mb-4 sm:mb-10">
        <h1 className="sm:text-[32px] text-2xl font-pn-extraboldit text-gray-600 max-xs:text-center">
          Шаблоны <br className="sm:hidden" />
          <span
            className="sm:ml-3 text-[16px] font-pn-regular text-primary-500 cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            Как это работает?
          </span>
        </h1>

        <Button
          disabled={!has_premium_subscription}
          onClick={handleClickAddTemplate}
          className={classButton}
          color="primary"
          size="xs"
        >
          <IconTemplatesHeaderAdd />
          Добавить шаблон
        </Button>
      </div>
    </>
  );
};

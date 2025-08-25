import AsidePremiumModal from "@components/aside/components/modal/premium/AsidePremiumModal.jsx";
import { IconZeroPremium, IconEmpty } from "@icons";
import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * Компонент пустых шаблонов на аккаунте
 * @returns {JSX.Element}
 * @param {number} state - Страница
 * @param {string} text - Текст компонента
 * @constructor
 */
export const TemplatesZeroData = ({ state, text }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClickPremium = () => setOpenModal(true);

  return (
    <div className="w-full flex flex-col z-[50] gap-6 sm:gap-10 items-center bg-white rounded-2xl justify-center py-16">
      {state === 1 ? <IconZeroPremium /> : <IconEmpty />}

      <div className="text-xl sm:text-2xl text-center font-pn-boldit max-sm:text-center text-gray-600">
        {text}
      </div>

      {state === 1 && (
        <>
          <AsidePremiumModal
            setOpenModal={setOpenModal}
            openModal={openModal}
          />

          <Button
            onClick={handleClickPremium}
            className="shadow-button"
            color="primary"
            size="md"
          >
            Приобрести премиум
          </Button>
        </>
      )}
    </div>
  );
};

TemplatesZeroData.propTypes = {
  /**
   * Страница
   */
  state: PropTypes.number.isRequired,

  /**
   * Текст компонента
   */
  text: PropTypes.string,
};

TemplatesZeroData.defaultProps = {
  text: "Список шаблонов пуст :(",
  state: 1,
};

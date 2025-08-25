import { AiOutlineInfo } from "react-icons/ai";
import { getCookie, setCookie } from "@utils";
import { useEffect, useState } from "react";
import { ModalBanner } from "@components/services/components/banner/components";

/**
 * Компонент модального окна с созданием заказа youtube в первый раз
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesFormModalCreateOrderYt = () => {
  const [openModalOnce, setOpenModalOnce] = useState(false);

  // useEffect(() => {
  //   if (getCookie("is_alert_n1_done") === "true") {
  //     setOpenModalOnce(true);
  //     setCookie("is_alert_n1_done", "false");
  //   }
  // }, [document.cookie]);

  return (
    <ModalBanner
      text={
        <div className="flex flex-col gap-2">
          <h2 className="text-center font-pn-bold text-2xl">
            Заказ успешно создан
          </h2>
          <p>
            Учтите, что результаты выполнения заданий YouTube просмотров не
            всегда сразу отображаются на счетчике после выполнения, это связано
            с кэшированием YouTube и его сложными алгоритмами проверок не
            естественной активности. Изменения на счетчиках могут вступать в
            силу с задержкой. Это касается абсолютно всех видео на данном
            видеохостинге, даже без накрутки.
          </p>
        </div>
      }
      title={
        <div className="mx-auto w-[110px] h-[110px] flex items-center rounded-full justify-center border-4 border-primary-400 bg-white">
          <AiOutlineInfo className="w-[75px] h-[75px] fill-primary-500" />
        </div>
      }
      setOpenModal={() => setOpenModalOnce(false)}
      openModal={openModalOnce}
    />
  );
};

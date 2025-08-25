import { AiOutlineInfo } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { VAR_LINK_ROUTES } from "@vars";
import { useState } from "react";

import { ModalBanner } from "./components";
import { useRouter } from "next/navigation";

/**
 * Компонент баннера-предупреждения
 * @returns {JSX.Element}
 * @constructor
 */
export const BannerButtonWarning = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const service = useSelector(
    (state) => state.services.route.serviceInfo?.service,
  );
  const type = useSelector((state) => state.services.route.serviceInfo?.type);
  const name = useSelector((state) => state.services.route.serviceInfo?.name);
  const qualities = useSelector((state) => state.services.route.qualities);

  const isVkWarn =
    service === "vk" &&
    (name === "group_subs" || name === "friends" || name === "likes"); // Когда показывать баннер в вк
  const isYtWarn =
    service === "youtube" && name === "views" && type === "offers"; // Когда показывать баннер в youtube
  const isTgWarn = service === "telegram" && name === "auto_post_views"; // Когда показывать баннер в telegram
  const isTtWarn = service === "tiktok" && name === "likes"; // Когда показывать баннер в tiktok
  const isShowBanner =
    isVkWarn || isYtWarn || isTtWarn || isTgWarn ? true : null;

  /**
   * Рендерим содержимое баннера
   * @returns {JSX.Element}
   */
  const renderChildrenButton = () => {
    if (isVkWarn)
      return (
        <>
          <p className="font-pn-semibold">Автоматическое списание от VK</p>
          <div className="rounded-[35px] bg-white p-1 px-2.5 font-pn-semibold text-primary-500">
            Подробнее
          </div>
        </>
      );
    else if (service === "youtube" && name === "views")
      return (
        <>
          <p className="font-pn-semibold max-sm:pl-[10px]">
            Новый уникальный алгоритм просмотров из рекомендаций
          </p>
          <div className="rounded-[35px] bg-white p-1 px-2.5 font-pn-semibold text-primary-500">
            Перейти
          </div>
        </>
      );
    else if (isTtWarn)
      return (
        <>
          <p className="font-pn-semibold">Подходят только российские профили</p>
          <div className="rounded-[35px] bg-white p-1 px-2.5 font-pn-semibold text-primary-500">
            Почему?
          </div>
        </>
      );
    else if (isTgWarn)
      return (
        <>
          <p className="font-pn-semibold">Как работают автопросмотры?</p>
          <div className="rounded-[35px] bg-white p-1 px-2.5 font-pn-semibold text-primary-500">
            Прочитать
          </div>
        </>
      );
  };

  /**
   * Рендерим модалку баннера
   * @returns {JSX.Element}
   */
  const renderModal = () => {
    const textModal = () => {
      if (isVkWarn)
        return "Вконтакте за последние пол года кардинально переработал систему определения ботов и накрутки. Теперь аккаунты удалённые или заблокированные навсегда, автоматически удаляются из подписчиков сообщества, что чревато зачастую офферам (ботам). Но и с живыми стоит быть осторожней, быстрый рост сообщества без настоящего трафика может повлечь за собой блокировку группы.";
      else if (service === "youtube" && name === "views")
        return "Благодаря новому уникальному алгоритму живые просмотры идут напрямую из рекомендаций. Моментальный старт, без списаний, стабильная скорость, быстрое отображение на счетчике, все зрители уникальные, а удержание до 8 минут. Видео растет в поиске и в дальнейшем идет бесплатный трафик с поиска.";
      else if (isTtWarn)
        return "Российские пользователи теперь могут просматривать контент и профили только своей страны. Все наши живые аккаунты зарегистрированы на российские номера и не могу взаимодействовать с иностранными профилями.";
      else if (isTgWarn)
        return "Автопросмотры - это автоматическая накрутка просмотров на новые посты, которые выходят в вашем Telegram канале. Мы постоянно отслеживаем ваш канал на наличие новых постов. Как только появляется новый пост, мы автоматически создаем заказ в соответствии с ранее установленными настройками и выбранным вами тарифом. Таким образом, на вашем EasyLiker аккаунте будут автоматически заказываться просмотры на Telegram в соответствии с указанной скоростью и количеством заказа.";
    };

    return (
      <ModalBanner
        title={
          <div className="mx-auto w-[110px] h-[110px] flex items-center rounded-full justify-center border-4 border-primary-400 bg-white">
            <AiOutlineInfo className="w-[75px] h-[75px] fill-primary-500" />
          </div>
        }
        setOpenModal={() => setOpenModal(false)}
        openModal={openModal}
        text={textModal()}
      />
    );
  };

  const handleSetOpenModal = () => {
    const lastTypeQuality = qualities[qualities?.length - 1];
    const lastNameTypeQuality = qualities[qualities?.length - 1]?.name;
    const firstQuality = lastTypeQuality?.quality[0]?.name?.split("_")[0];

    if (isYtWarn) {
      setOpenModal(true);
      router.push(
        `/${VAR_LINK_ROUTES.services}/${service}/${name}/${lastNameTypeQuality}/${firstQuality}`,
      );
    } else setOpenModal(true);
  };

  return (
    <>
      {renderModal()}

      {isShowBanner && (
        <>
          <Button
            className="mb-12 w-full shadow-serviceWarn hover:bg-inherit focus:ring-0 sm:max-w-[70%] [&_span]:w-full [&_span]:items-center [&_span]:max-sm:p-[8px_16px] [&_span]:max-sm:pl-[20px] [&_span]:max-xs:gap-1 [&_span]:flex-wrap [&_span]:xs:flex-nowrap [&_span]:text-center [&_span]:xs:text-left [&_span]:justify-center [&_span]:xs:justify-between"
            onClick={handleSetOpenModal}
            color="primary"
            size="xs"
          >
            {renderChildrenButton()}
          </Button>
        </>
      )}
    </>
  );
};

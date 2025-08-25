import { classesTvPreview } from "@apppages/home/components/preview/styles";

import ImgPhone from "./assets/images/img-home-phone.png";
import "./styles/preview.scss";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import LinkButton from "@components/button/LinkButton";
import Image from "next/image";

/**
 * Компонент preview для главной
 * @returns {JSX.Element}
 * @constructor
 */
export const Preview = async () => {
  const headersList = await headers();
  const ua = userAgent({ headers: headersList });
  const { isMobile } = ua.device.type === "mobile";

  const {
    tvPreviewIconPhone,
    tvHomeDescription,
    tvPreviewButtons,
    tvTitlePreview,
    tvWrapperFirst,
    tvWrapperLast,
    tvHomePreview,
  } = classesTvPreview();

  return (
    <div className={`${tvHomePreview()} opacity-100`}>
      {/* Слоган */}
      <div className={tvWrapperFirst()}>
        {/* Заголовок */}
        <h1 className={tvTitlePreview()}>
          {isMobile
            ? "Самое качественное продвижение социальных сетей"
            : "Самое качественное продвижение ваших социальных сетей"}
        </h1>

        {/* Описание */}
        <p className={tvHomeDescription()}>
          Накрутка любого вида. Самые выгодные цены!
        </p>

        {/* Кнопки авторизации */}
        <div className={tvPreviewButtons()}>
          <LinkButton
            className="shadow-button py-[19px] w-full sm:w-[225px] max-sm:translate-y-4"
            route="/register"
            color="primary"
            size=""
          >
            Регистрация
          </LinkButton>

          <LinkButton
            className="py-[17px] sm:py-[19px] min-w-[90px] sm:w-[150px] max-sm:translate-y-4"
            route="/auth"
            color="secondaryTransparent"
            size=""
          >
            Вход
          </LinkButton>
        </div>
      </div>

      {/* Телефон */}
      <div className={tvWrapperLast()}>
        <Image
          alt="Самое качественное продвижение ваших социальных сетей"
          className={tvPreviewIconPhone()}
          src={ImgPhone}
          height="640"
          width="440"
        />
      </div>
    </div>
  );
};

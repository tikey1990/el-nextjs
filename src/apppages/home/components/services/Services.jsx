import { classesTvServices } from "@apppages/home/components/services/assets/styles";
import "@apppages/home/components/services/assets/styles/services.scss";
import { VAR_LINK_ROUTES } from "@vars";
import { Button, Flowbite } from "flowbite-react";

import ImgServices from "./assets/images/img-home-social.png";
import Link from "next/link";
import Image from "next/image";
import { flowBiteCustomTheme } from "@theme";

/**
 * Блок тарифов на главной
 * @returns {JSX.Element}
 * @constructor
 */
export const Services = () => {
  const {
    tvHomeServicesWrapperFirst,
    tvHomeServicesWrapperLast,
    tvHomeServicesWrapper,
    tvHomeServicesDesktop,
    tvHomeServicesMobile,
    tvHomeDescription,
    tvHomeServicesImg,
    tvHomeSubtitle,
    tvHomeServices,
  } = classesTvServices();

  return (
    <>
      <div className={`${tvHomeServices()} opacity-100`}>
        {/* Desktop */}
        <div className={tvHomeServicesDesktop()}>
          <Image
            alt="Накрутка подписчиков, просмотров, лайков"
            className={tvHomeServicesImg()}
            src={ImgServices}
            height="474"
            width="522"
          />

          <div className={tvHomeServicesWrapper()}>
            <p className={tvHomeSubtitle()}>
              Накрутка подписчиков, просмотров, лайков
            </p>
            <p className={tvHomeDescription()}>
              и еще многих видов социальной активности
            </p>

            <Link href={`/${VAR_LINK_ROUTES.services}`}>
              <Button
                className="button-shadow w-[194px] h-[70px] [&_span]:font-pn-regular"
                color="primary"
                size="sm"
              >
                Тарифы
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className={tvHomeServicesMobile()}>
          <div className={tvHomeServicesWrapperFirst()}>
            <Image
              alt="Накрутка подписчиков, просмотров, лайков"
              className={tvHomeServicesImg()}
              src={ImgServices}
              height="126"
              width="139"
            />
            <p className={tvHomeSubtitle()}>
              Накрутка подписчиков, просмотров, лайков
            </p>
          </div>

          <div className={tvHomeServicesWrapperLast()}>
            <p className={tvHomeDescription()}>
              и еще многих видов социальной активности
            </p>

            <Link href={`/${VAR_LINK_ROUTES.services}`} className="w-[50%]">
              <Button
                className="button-shadow w-full [&_span]:font-pn-regular"
                color="primary"
                size="sm"
              >
                Тарифы
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

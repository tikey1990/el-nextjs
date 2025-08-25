import { classesTvAdv } from "@apppages/home/components/adv/assets/styles";

import {
  ImgProgress,
  ImgStart,
  ImgPromo,
  ImgPrice,
  ImgChat,
  ImgBots,
  ImgReg,
  ImgPay,
  ImgApi,
} from "./assets";
import "./assets/styles/adv.scss";
import Image from "next/image";

/**
 * Преимущества на главной
 * @returns {JSX.Element}
 * @constructor
 */
export const Adv = () => {
  const {
    tvHomeAdvWrapperItem,
    tvAdvWrapperTextSpan,
    tvAdvWrapperTextBr,
    tvAdvWrapperText,
    tvHomeAdvWrapper,
    tvAvdImagePrice,
    tvHomeSubtitle,
    tvHomeAdv,
    tvAdvImg,
  } = classesTvAdv();

  return (
    <div className={`${tvHomeAdv()} opacity-100`}>
      <p className={tvHomeSubtitle()}>Плюсы работы с нами</p>

      <div className={tvHomeAdvWrapper()}>
        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={`${tvAdvImg()} ${tvAvdImagePrice()}`}
            src={ImgPrice}
            height={100}
            width={72}
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Самое лучшее качество <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>за самые низкие цены</span>
          </p>
        </div>

        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={tvAdvImg()}
            src={ImgProgress}
            height="90"
            width="90"
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Отслеживание заказов <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>через прогресс бар</span>
          </p>
        </div>

        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={tvAdvImg()}
            src={ImgStart}
            height="100"
            width="84"
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Моментальный старт <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>всех услуг</span>
          </p>
        </div>

        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={tvAdvImg()}
            height="100"
            src={ImgApi}
            width="100"
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Удобное и быстрое API <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>с примерами кода</span>
          </p>
        </div>

        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={tvAdvImg()}
            src={ImgChat}
            height="100"
            width="100"
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Онлайн поддержка <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>на сайте через чат</span>
          </p>
        </div>

        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={tvAdvImg()}
            height="100"
            src={ImgPay}
            width="100"
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Множество способов <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>
              пополнения без комиссии
            </span>
          </p>
        </div>

        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={tvAdvImg()}
            src={ImgBots}
            height="100"
            width="100"
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Наличие удобного Telegram бота{" "}
            <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>для создания заказов</span>
          </p>
        </div>

        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={tvAdvImg()}
            src={ImgPromo}
            height="100"
            width="100"
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Раздачи промокодов <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>
              с балансом в соц. сетях
            </span>
          </p>
        </div>

        <div className={tvHomeAdvWrapperItem()}>
          <Image
            className={tvAdvImg()}
            height="100"
            src={ImgReg}
            width="100"
            alt=""
          />
          <p className={tvAdvWrapperText()}>
            Быстрая регистрация <br className={tvAdvWrapperTextBr()} />
            <span className={tvAdvWrapperTextSpan()}>без подтверждения</span>
          </p>
        </div>
      </div>
    </div>
  );
};

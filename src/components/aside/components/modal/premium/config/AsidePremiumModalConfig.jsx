import Image from "next/image";

import {
  ImgPremiumModalAdvTemplates,
  ImgPremiumModalAdvSupport,
  ImgPremiumModalAdvPremium,
  ImgPremiumModalAdvMass,
  ImgPremiumModalAdvAuto,
} from "../assets/images";

export const plans = [
  { duration: "1 месяц", durationCount: 1, discount: 0, price: 289, id: 1 },
  { duration: "6 месяцев", durationCount: 6, discount: 15, price: 1499, id: 2 },
  {
    duration: "12 месяцев",
    durationCount: 12,
    discount: 20,
    price: 2799,
    id: 3,
  },
];

/**
 * Конфиг для премиум модалки
 */
export const advPremiumModalConfig = [
  {
    text: (
      <span className="inline-flex flex-col gap-1">
        <p className="text-gray-600 text-sm font-pn-semiboldit">
          Premium оформление
        </p>
        <p className="text-gray-500 text-[13px] font-pn-regular leading-snug">
          Уникальный <br className="max-sm:hidden" /> дизайн разделов
        </p>
      </span>
    ),
    icon: (
      <Image src={ImgPremiumModalAdvPremium} className="w-[52px] h-[52px]" />
    ),
  },
  {
    text: (
      <span className="inline-flex flex-col gap-1">
        <p className="text-gray-600 text-sm font-pn-semiboldit">Автоуслуги</p>
        <p className="text-gray-500 text-[13px] font-pn-regular leading-snug">
          Авто-накрутка
          <br className="max-sm:hidden" /> на новые посты
        </p>
      </span>
    ),
    icon: <Image className="w-[52px] h-[52px]" src={ImgPremiumModalAdvAuto} />,
  },
  {
    text: (
      <span className="inline-flex flex-col gap-1">
        <p className="text-gray-600 text-sm font-pn-semiboldit">
          Массовые заказы
        </p>
        <p className="text-gray-500 text-[13px] font-pn-regular leading-snug">
          В один клик на <br className="max-sm:hidden" /> группу ссылок
        </p>
      </span>
    ),
    icon: <Image className="w-[52px] h-[52px]" src={ImgPremiumModalAdvMass} />,
  },
  {
    text: (
      <span className="inline-flex flex-col gap-1">
        <p className="text-gray-600 text-sm font-pn-semiboldit">
          Премиум саппорт
        </p>
        <p className="text-gray-500 text-[13px] font-pn-regular leading-snug">
          Приоритетная <br className="max-sm:hidden" /> тех. поддержка
        </p>
      </span>
    ),
    icon: (
      <Image src={ImgPremiumModalAdvSupport} className="w-[52px] h-[52px]" />
    ),
  },
  {
    text: (
      <span className="inline-flex flex-col gap-1">
        <p className="text-gray-600 text-sm font-pn-semiboldit">
          Шаблоны услуг
        </p>
        <p className="text-gray-500 text-[13px] font-pn-regular leading-snug">
          Заполни один раз
          <br className="max-sm:hidden" /> используй вечно
        </p>
      </span>
    ),
    icon: (
      <Image src={ImgPremiumModalAdvTemplates} className="w-[52px] h-[52px]" />
    ),
  },
];

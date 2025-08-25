import { animated } from "react-spring";

import { DropDown } from "@components";
import classnames from "classnames";

import { IconFaqArrow, IconFaqDot } from "../assets/icons";
import "../assets/styles/faqQuestions.scss";
import Link from "next/link";

/**
 * Компонент вопросов и ответов
 * @returns {JSX.Element}
 * @constructor
 */
export const FaqQuestions = () => {
  // eslint-disable-next-line react/prop-types
  const LabelDropDown = ({ active, text }) => (
    <div className="w-full flex flex-row sm:items-center cursor-pointer gap-[10px]">
      <IconFaqDot
        className="min-w-[6px] max-sm:translate-y-[8px]"
        height={6}
        width={6}
      />
      <p className="text text-color-black text-left text-type-semibold text-size-ultra-md">
        {text}
      </p>
      <IconFaqArrow
        className={classnames("ml-auto min-w-[11px] max-sm:translate-y-[8px]", {
          "rotate-180": active,
        })}
        height={7}
        width={11}
      />
    </div>
  );

  const dataQuestions = [
    {
      description:
        "Оффер — это аккаунт, зарегистрированный в социальных сетях для выполнения накрутки. Правильный оффер показывает преимущество именно вашего товара в сравнении с аналогичными товарами конкурентов. Покупатель должен захотеть купить товар именно у вас!",
      title: "Что такое офферы?",
    },
    {
      description:
        "Результаты выполнения заданий не всегда сразу отображаются на счетчике после выполнения, это связано с кэшированием YouTube и его сложными алгоритмами проверок не естественной активности. Изменения на счетчиках могут вступать в силу с задержкой.",
      // eslint-disable-next-line
      title: 'Статус YouTube "Выполнено", но счетчик не изменился',
    },
    {
      description:
        "Уберите свой лайк с видео, поставьте заново и обновите страницу.",
      title: "Лайки YouTube выполнены, но их нет на счётчике",
    },
    {
      description:
        "Приоритет выполнения задания и качество аккаунтов зависит от ценового диапазона. Чем выше качество – тем выше скорость, качество аккаунтов и результат накрутки.",
      title: "Чем отличаются качества?",
    },
    {
      description:
        "Если в указанный период гарантии с момента заказа произошли отписки больше чем указано в описании не по вашей вине, то мы перезапустим часть заказа.",
      title: "Что такое гарантия?",
    },
    {
      description:
        "Сторонние программы, такие как AdBlock, блокируют некоторый контент на нашем сайте, в таком случае необходимо снять эти ограничения в настройках вашей программы или отключить ПО для нашего сайта.",
      title: "Почему у меня нет некоторых кнопок и полей?",
    },
    {
      description:
        "Крайне редко, но могут быть задержки со стороны платежных агрегаторов. В таком случае, вам нужно написать в нашу техническую поддержку, если средства не приходят на баланс в течении 10 минут.",
      title: "Не приходят средства на баланс",
    },
    {
      description: (
        <>
          Промокод можно активировать внизу на странице{" "}
          <Link
            className="text text-color-primary hover:underline underline-offset-2"
            href="/profile/deposit"
          >
            пополнения баланса.
          </Link>
        </>
      ),
      title: "Где активировать промокод?",
    },
    {
      description:
        "Не переживайте, если ссылка была недействительная - заказ не будет выполнен и средства вернутся на баланс Вашего личного кабинета в течение некоторого времени, в таком же случае если контент стал недоступен во время выполнения - статус заказа автоматически поменяется на частично выполнен и остаток средств вернётся на баланс.",
      title:
        "Что делать, если я неправильно указал ссылку или страница стала недоступной?",
    },
  ];

  const renderQuestions = () =>
    dataQuestions.map((elem, index) => (
      <DropDown
        label={(active) => <LabelDropDown text={elem.title} active={active} />}
        key={index}
      >
        {(animation) => (
          <animated.p
            className="description text text-color-black text-size-md pointer-events-none"
            style={animation}
          >
            {elem.description}
          </animated.p>
        )}
      </DropDown>
    ));

  return (
    <div className="faq-contacts">
      <h2 className="text text-color-black text-type-extrabold-it text-size-lg">
        FAQ - Вопросы и ответы
      </h2>

      <div className="faq-contacts__wrapper">{renderQuestions()}</div>
    </div>
  );
};

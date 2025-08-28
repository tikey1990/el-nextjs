import { IconFaqRobot } from "../assets/icons";
import "../assets/styles/faqAnswering.scss";

/**
 * Компонент автоответчика
 * @constructor
 */
export const FaqAnswering = () => {
  return (
    <div className="faq-answering">
      <IconFaqRobot width="92" height="72" />

      <p className="text text-color-black text-type-regular-it text-size-lg">
        Автоответчик <br className="sm:hidden" /> по остальным
        <br className="sm:hidden" /> вопросам:{" "}
        <a
          className="text text-color-primary text-type-bold-it text-size-lg"
          href="tel:79249089621"
        >
          +7 (930) 503-00-26
        </a>
      </p>
    </div>
  );
};

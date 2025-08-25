"use client";
import {
  FaqAnswering,
  FaqQuestions,
  FaqSocial,
} from "@apppages/profile/pages/faq/components";
import "@apppages/profile/pages/faq/assets/styles/faq.scss";

/**
 * Страница faq
 * @returns {JSX.Element}
 * @constructor
 */
const Faq = () => {
  return (
    <div className="faq">
      <h1 className="sm:text-[32px] text-2xl font-pn-extraboldit mb-6 text-gray-600">
        Контакты
      </h1>

      {/* Соц сети */}
      <FaqSocial />

      {/* Вопросы и ответы */}
      <FaqQuestions />

      {/* Автоответчик */}
      <FaqAnswering />
    </div>
  );
};

export default Faq;

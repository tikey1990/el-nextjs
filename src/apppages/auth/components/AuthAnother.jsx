"use client";
import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

/**
 * Компонент для перехода на другие страницы авторизации
 * @param {string} text - Текст для перехода на другие страницы авторизации
 * @param {string} textLink - Текст ссылки для перехода на другие страницы авторизации
 * @param {string} link - Ссылка для перехода на другие страницы авторизации
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthAnother = ({ textLink, text, link }) => {
  const router = useRouter();

  /**
   * Слушатель для перехода на другие страницы авторизации
   */
  const handleNavigateAnotherAuth = () => router.push(link);

  return (
    <div className="shadow-content rounded-4xl flex max-sm:gap-4 flex-col items-center justify-between bg-[rgba(89,203,255,0.08)] px-12 py-5 backdrop-blur sm:w-[380px] w-full sm:flex-row">
      <p className="font-pn-semiboldit text-md opacity-80">{text}</p>

      {/* Создать аккаунт */}
      <Button
        onClick={handleNavigateAnotherAuth}
        className="font-pn-bold px-6 py-4"
        color="secondaryTransparent"
        size="custom"
        pill
      >
        {textLink}
      </Button>
    </div>
  );
};

AuthAnother.propTypes = {
  /**
   * Текст ссылки для перехода на другие страницы авторизации
   */
  textLink: PropTypes.string.isRequired,

  /**
   * Текст для перехода на другие страницы авторизации
   */
  text: PropTypes.string.isRequired,

  /**
   * Ссылка для перехода на другие страницы авторизации
   */
  link: PropTypes.string.isRequired,
};

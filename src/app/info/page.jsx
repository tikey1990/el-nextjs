import {
  IconSocialGmail,
  IconInst,
  IconVk,
  IconTg,
} from "@icons/social/index.js";
import { VAR_SOCIAL_LINKS, VAR_LINK_ROUTES } from "@vars";
import { classContainer } from "@utils";
import Link from "next/link";

/**
 * Страница контактов
 * @returns {JSX.Element}
 * @constructor
 */
const Info = () => {
  return (
    <div className={classContainer("flex flex-col items-center gap-10")}>
      <div className="flex flex-col w-full sm:w-[60%] shadow-content">
        <p className="text-white w-full text-center rounded-t-2xl py-10 bg-gradient-blue-500 font-pn-regular text-[22px]">
          Контакты
        </p>
        <div className="text-white w-full flex flex-row rounded-b-2xl justify-center gap-4 sm:gap-16 py-20 bg-white">
          <a
            className="p-3 h-[50px] w-[50px] bg-gradient-telegram flex justify-center items-center rounded-2xl"
            href={VAR_SOCIAL_LINKS.tg}
            rel="noreferrer"
            target="_blank"
          >
            <IconTg className="absolute w-[40px] cursor-pointer" />
          </a>

          <a
            className="p-3 h-[50px] w-[50px] flex justify-center items-center rounded-2xl"
            href={`mailto:${VAR_SOCIAL_LINKS.email}`}
            rel="noreferrer"
            target="_blank"
          >
            <IconSocialGmail className="absolute w-[50px] h-[50px] cursor-pointer" />
          </a>

          <a
            className="p-3 h-[50px] w-[50px] bg-gradient-inst flex justify-center items-center rounded-2xl"
            href={VAR_SOCIAL_LINKS.inst}
            rel="noreferrer"
            target="_blank"
          >
            <IconInst className="absolute w-[40px] cursor-pointer" />
          </a>

          <a
            className="p-3 h-[50px] w-[50px] bg-[#2787F5] flex justify-center items-center rounded-2xl"
            href={VAR_SOCIAL_LINKS.vk}
            rel="noreferrer"
            target="_blank"
          >
            <IconVk className="absolute w-[55px] cursor-pointer" />
          </a>
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-[60%] shadow-content">
        <p className="text-white w-full text-center py-10 rounded-t-2xl bg-gradient-blue-500 font-pn-regular text-[22px]">
          Документы
        </p>
        <div className="text-white w-full flex flex-col items-center rounded-b-2xl gap-4 py-10 bg-white">
          <Link
            className="text-[#4671D5] font-pn-regular text-[22px]"
            href={`/${VAR_LINK_ROUTES.offer}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Публичная оферта
          </Link>
          <Link
            className="text-[#4671D5] font-pn-regular text-[22px]"
            href={`/${VAR_LINK_ROUTES.agreement}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Пользовательское соглашение
          </Link>
          <Link
            className="text-[#4671D5] font-pn-regular text-[22px]"
            href={`/${VAR_LINK_ROUTES.privacy}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-[60%] shadow-content">
        <p className="text-white w-full text-center py-10 rounded-t-2xl bg-gradient-blue-500 font-pn-regular text-[22px]">
          Реквизиты
        </p>
        <div className="text-[#4671D5] font-pn-regular text-[22px] w-full flex max-sm:px-2 text-center flex-col rounded-b-2xl items-center gap-4 py-10 bg-white">
          Индивидуальный предприниматель Кайшаури Теймур Гарьевич
          <br />
          141143, РОССИЯ, МОСКОВСКАЯ обл, ЩЕЛКОВСКИЙ р-н,
          <br />
          МЕДВЕЖЬИ ОЗЕРА д, СОСНОВАЯ ул, ДОМ 9<br />
          ИНН
          <br />
          505011173223
          <br />
          ОГРНИП
          <br />
          317505000011390
          <br />
          Расчётный счёт
          <br />
          4080281030150004078
          <br />
          Корр. счёт
          <br />
          30101810485250000999
          <br />
          БИК
          <br />
          044525999 Точка ПАО Банка «ФК Открытие» г. Москва
        </div>
      </div>
    </div>
  );
};

export default Info;

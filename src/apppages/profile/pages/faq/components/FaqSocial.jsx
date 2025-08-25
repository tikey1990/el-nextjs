import { VAR_SOCIAL_LINKS } from "@vars";

import { IconFaqTelegram, IconFaqEmail, IconFaqInst, IconFaqVk } from "../assets/icons";
import "../assets/styles/faqSocial.scss";

/**
 * Компонент блока соц сетей
 * @returns {JSX.Element}
 * @constructor
 */
export const FaqSocial = () => {
    return (
        <div className="faq-social">
            <a className="social-item telegram" href={VAR_SOCIAL_LINKS.tg} rel="noreferrer" target="_blank">
                <IconFaqTelegram />

                <p className="text-white text-[15px] font-pn-boldit">Чат в Telegram</p>
            </a>
            <a href={`mailto:${VAR_SOCIAL_LINKS.email}`} className="social-item mail" rel="noreferrer" target="_blank">
                <IconFaqEmail />

                <p className="text-white text-[15px] font-pn-boldit">Эл. почта</p>
            </a>
            <a href={VAR_SOCIAL_LINKS.inst} className="social-item inst" rel="noreferrer" target="_blank">
                <IconFaqInst />

                <p className="text-white text-[15px] font-pn-boldit">Новости в Instagram</p>
            </a>
            <a href={VAR_SOCIAL_LINKS.vk} className="social-item vk" rel="noreferrer" target="_blank">
                <IconFaqVk />

                <p className="text-white text-[15px] font-pn-boldit">Группа ВК</p>
            </a>
        </div>
    );
};

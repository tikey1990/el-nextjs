import { IconFacebook, IconTwitter, IconTwitch, IconInst, IconYt, IconVk, IconTt, IconTg } from "@icons/social/index.js";

/**
 * Конфиг социальных иконок
 */
export const configSocialsIcons = {
    telegram: {
        iconMassOrder: <IconTg className="w-[33px] h-[33px] -translate-x-[1px]" />,
        bg: "bg-gradient-telegram",
    },
    facebook: {
        iconMassOrder: <IconFacebook className="w-[45px] h-[45px]" />,
        bg: "bg-gradient-facebook",
    },
    twitter: {
        iconMassOrder: <IconTwitter className="w-[35px] h-[35px]" />,
        bg: "bg-gradient-twitter",
    },
    twitch: {
        iconMassOrder: <IconTwitch className="w-[25px] h-[25px]" />,
        bg: "bg-gradient-twitch",
    },
    instagram: {
        iconMassOrder: <IconInst className="w-[40px] h-[40px]" />,
        bg: "bg-gradient-inst",
    },
    tiktok: {
        iconMassOrder: <IconTt className="w-[40px] h-[40px]" />,
        bg: "bg-[#1c181d]",
    },
    youtube: {
        iconMassOrder: <IconYt className="w-[45px] h-[45px]" />,
        bg: "bg-red-600",
    },
    vk: {
        iconMassOrder: <IconVk className="w-[87px] h-[87px]" />,
        bg: "bg-[#2787f5]",
    },
};

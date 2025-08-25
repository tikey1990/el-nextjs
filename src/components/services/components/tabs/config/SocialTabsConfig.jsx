import { IconFacebook, IconTwitter, IconTwitch, IconInst, IconYt, IconVk, IconTt, IconTg } from "@icons/social";
import { ImgServicesWebsiteTraffic } from "@images/index.js";

export const configSocialTabsDataServices = [
    {
        icon: (
            <img
                className="w-[50px] h-[50px] xs:w-[55px] xs:h-[55px] sm:w-[55px] sm:h-[55px]"
                src={ImgServicesWebsiteTraffic}
                alt="website-traffic"
            />
        ),
        bg: "bg-gradient-facebook",
        label: "Траффик сайтов",
        name: "websitetraffic",
    },
    {
        icon: <IconInst className="w-[40px] h-[40px] xs:w-[47px] xs:h-[47px] sm:w-[55px] sm:h-[55px]" />,
        bg: "bg-gradient-inst",
        label: "Instagram",
        name: "instagram",
    },
    {
        icon: <IconVk className="w-[60px] h-[60px] xs:w-[70px] xs:h-[70px] sm:w-[87px] sm:h-[87px]" />,
        bg: "bg-[#2787f5]",
        label: "VK",
        name: "vk",
    },
    {
        icon: <IconYt className="w-[45px] h-[45px] xs:w-[54px] xs:h-[54px] sm:w-[59px] sm:h-[59px]" />,
        label: "YouTube",
        bg: "bg-red-600",
        name: "youtube",
    },
    {
        icon: <IconTg className="w-[35px] h-[35px] xs:w-[44px] xs:h-[44px] sm:w-[56px] sm:h-[56px]" />,
        bg: "bg-gradient-telegram",
        label: "Telegram",
        name: "telegram",
    },
    {
        icon: <IconTt className="w-[40px] h-[40px] xs:w-[47px] xs:h-[47px] sm:w-[55px] sm:h-[55px]" />,
        bg: "bg-[#1c181d]",
        label: "Tiktok",
        name: "tiktok",
    },
    {
        icon: <IconTwitch className="w-[26px] h-[26px] xs:w-[32px] xs:h-[32px] sm:w-[40px] sm:h-[40px]" />,
        bg: "bg-gradient-twitch",
        label: "Twitch",
        name: "twitch",
    },
    {
        icon: <IconTwitter className="w-[35px] h-[35px] xs:w-[43px] xs:h-[43px] sm:w-[52px] sm:h-[52px]" />,
        bg: "bg-gradient-twitter",
        label: "Twitter",
        name: "twitter",
    },
    {
        icon: <IconFacebook className="w-[47px] h-[47px] xs:w-[53px] xs:h-[53px] sm:w-[60px] sm:h-[60px]" />,
        bg: "bg-gradient-facebook",
        label: "Facebook",
        name: "facebook",
    },
];

import {
  ImgServicesWebsiteTraffic,
  ImgServicesDiscord,
  ImgServicesVkPlay,
  ImgServicesRutube,
  ImgServicesYappy,
  ImgServicesTrovo,
  ImgServicesNuum,
  ImgServicesKick,
  ImgServicesDzen,
} from "@images/index.js";
import Image from "next/image";

export const configSocialTabsDataServicesNew = [
  {
    icon: (
      <Image
        className="w-[80px] h-[40px] xs:w-[100px] xs:h-[47px] sm:w-[100px] sm:h-[55px]"
        src={ImgServicesKick}
        alt="kick"
      />
    ),
    bg: "bg-black",
    label: "Kick",
    name: "kick",
  },
  {
    icon: (
      <Image
        className="w-[50px] h-[50px] xs:w-[65px] xs:h-[65px] sm:w-[75px] sm:h-[75px]"
        src={ImgServicesDiscord}
        alt="discord"
      />
    ),
    label: "Discord",
    name: "discord",
    bg: "bg-white",
  },
  {
    icon: (
      <Image
        className="w-[40px] h-[40px] xs:w-[45px] xs:h-[45px] sm:w-[50px] sm:h-[50px]"
        src={ImgServicesVkPlay}
        alt="vk-play"
      />
    ),
    name: "vkplaylive",
    bg: "bg-[#0009b4]",
    label: "VK play",
  },
  {
    icon: (
      <Image
        className="w-[40px] h-[40px] xs:w-[45px] xs:h-[45px] sm:w-[45px] sm:h-[45px]"
        src={ImgServicesTrovo}
        alt="trovo"
      />
    ),
    label: "Trovo",
    bg: "bg-white",
    name: "trovo",
  },
  {
    icon: (
      <Image
        className="w-[40px] h-[40px] xs:w-[45px] xs:h-[45px] sm:w-[55px] sm:h-[55px]"
        src={ImgServicesNuum}
        alt="nuum"
      />
    ),
    bg: "bg-[#ff5101]",
    label: "NUUM",
    name: "nuum",
  },
  {
    icon: (
      <Image
        className="w-[40px] h-[40px] xs:w-[45px] xs:h-[45px] sm:w-[45px] sm:h-[45px]"
        src={ImgServicesDzen}
        alt="dzen"
      />
    ),
    bg: "bg-white",
    label: "Дзен",
    name: "dzen",
  },
  {
    icon: (
      <Image
        className="w-[40px] h-[40px] xs:w-[45px] xs:h-[45px] sm:w-[45px] sm:h-[45px]"
        src={ImgServicesRutube}
        alt="rutube"
      />
    ),
    bg: "bg-[#100942]",
    label: "Rutube",
    name: "rutube",
  },
  {
    icon: (
      <Image
        className="w-[50px] h-[50px] xs:w-[55px] xs:h-[55px] sm:w-[55px] sm:h-[55px]"
        src={ImgServicesYappy}
        alt="yappy"
      />
    ),
    bg: "bg-[#00e2b8]",
    label: "Yappy",
    name: "yappy",
  },
  {
    icon: (
      <Image
        className="w-[50px] h-[50px] xs:w-[55px] xs:h-[55px] sm:w-[55px] sm:h-[55px]"
        src={ImgServicesWebsiteTraffic}
        alt="website-traffic"
      />
    ),
    bg: "bg-gradient-facebook",
    label: "Траффик сайтов",
    name: "websitetraffic",
  },
];

import {
  IconSocialDiscord,
  IconSocialTwitter,
  IconSocialRutube,
  IconSocialVkPlay,
  IconSocialYappy,
  IconSocialTrovo,
  IconSocialKick,
  IconSocialInst,
  IconSocialNuum,
  IconSocialFb,
  IconSocialTg,
  IconSocialTt,
  IconSocialTw,
  IconSocialVk,
  IconSocialYt,
  IconSocialYd,
} from "@icons/social";
import { MdAutoAwesomeMotion, MdOutlineAutoMode } from "react-icons/md";
import { IconSourceSite, IconSourceApi } from "@icons/source/index.js";
import { useProfileOrderParamsUrl } from "@apppages/profile/hooks";
import { HiGlobeAlt, HiUpload } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import { useGetServicesQuery } from "@features";

/**
 * InitialState filters
 */
export const filtersInitState = {
  scrollPage: null,
  website: null,
  status: null,
  search: null,
  type: null,
};

/**
 * Данные для статусов фильтров
 */
export const dataFiltersStatuses = [
  { name: "выполняется" },
  { name: "выполнено" },
  { name: "частично" },
  { name: "отменен" },
  { name: "в очереди" },
];

/**
 * Данные для соц сетей фильтров
 */
export const dataFiltersWebsites = () => {
  const query = useGetServicesQuery();
  const { data } = query;
  // eslint-disable-next-line no-unsafe-optional-chaining
  const servicesData = [
    { name: "Все соцсети", value: "all" },
    ...(Array.isArray(data?.data) ? data?.data : []),
  ];

  const updatedServicesData =
    Array.isArray(servicesData) &&
    servicesData?.map((item) => {
      let icon;
      switch (item.name) {
        case "telegram":
          icon = <IconSocialTg />;
          break;
        case "vk":
          icon = <IconSocialVk />;
          break;
        case "instagram":
          icon = <IconSocialInst />;
          break;
        case "youtube":
          icon = <IconSocialYt />;
          break;
        case "tiktok":
          icon = <IconSocialTt />;
          break;
        case "facebook":
          icon = <IconSocialFb />;
          break;
        case "twitch":
          icon = <IconSocialTw />;
          break;
        case "twitter":
          icon = <IconSocialTwitter />;
          break;
        case "yappy":
          icon = <IconSocialYappy />;
          break;
        case "discord":
          icon = <IconSocialDiscord />;
          break;
        case "vkplaylive":
          icon = <IconSocialVkPlay />;
          break;
        case "rutube":
          icon = <IconSocialRutube />;
          break;
        case "trovo":
          icon = <IconSocialTrovo />;
          break;
        case "kick":
          icon = <IconSocialKick />;
          break;
        case "nuum":
          icon = <IconSocialNuum />;
          break;
        case "dzen":
          icon = <IconSocialYd />;
          break;
        default:
          icon = null;
      }

      return { ...item, icon };
    });

  return { ...query, data: updatedServicesData };
};

/**
 * Данные для категорий соц сетей фильтров
 */
export const dataFiltersServices = () => {
  const { paramWebsite } = useProfileOrderParamsUrl();
  const isParamWebsite = paramWebsite === null || paramWebsite === "all";

  const query = useGetServicesQuery();
  const { data: servicesData } = query;

  const servicesCurrentWebsite = Array.isArray(servicesData?.data)
    ? (servicesData?.data?.find((elem) => elem.name === paramWebsite)
        ?.categories ?? [])
    : [];

  return {
    ...query,
    data: [{ name: "Все услуги", value: "all" }, ...servicesCurrentWebsite],
    isParamWebsite,
  };
};
/**
 * Конфиг иконок типа заказа
 * @type {{site: {icon: JSX.Element}}}
 */
export const configOrderTypeIcon = {
  auto_service: {
    icon: (
      <MdOutlineAutoMode className="h-4 w-4 fill-white sm:fill-[#828FA4]" />
    ),
  },
  templates: {
    icon: (
      <MdAutoAwesomeMotion className="h-4 w-4 fill-white sm:fill-[#828FA4]" />
    ),
  },
  telegram: {
    icon: <FaTelegramPlane className="h-4 w-4 fill-white sm:fill-[#828FA4]" />,
  },
  pre_order: {
    icon: <HiGlobeAlt className="h-4 w-4 fill-white sm:fill-[#828FA4]" />,
  },
  site: {
    icon: <IconSourceSite className="h-4 w-4 fill-white sm:fill-[#828FA4]" />,
  },
  massorders: {
    icon: <HiUpload className="h-4 w-4 fill-white sm:fill-[#828FA4]" />,
  },
  api: {
    icon: <IconSourceApi className="h-4 w-4 fill-white sm:fill-[#828FA4]" />,
  },
};

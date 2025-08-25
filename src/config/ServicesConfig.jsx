import {
  ImgReactionClapperboard,
  ImgReactionScreaming,
  ImgReactionVomiting,
  ImgReactionStareyes,
  IconServicesPremium,
  ImgReactionDislike,
  ImgReactionBeaming,
  ImgReactionCrying,
  IconStreamViewers,
  ImgReactionHeart,
  ImgReactionPoop,
  ImgReactionLike,
  ImgReactionFire,
  IconSubscribers,
  IconListenings,
  IconReactions,
  IconPollVotes,
  IconComments,
  IconAutoView,
  IconWarning,
  IconVkClips,
  IconFriends,
  IconAnswers,
  IconRepost,
  IconBoosts,
  IconVideo,
  IconView,
  IconLike,
} from "@icons/services";
import {
  IconSocialTwitter,
  IconSocialDiscord,
  IconSocialVkPlay,
  IconSocialRutube,
  IconSocialYappy,
  IconSocialTrovo,
  IconSocialKick,
  IconSocialInst,
  IconSocialNuum,
  IconSocialYd,
  IconSocialYt,
  IconSocialVk,
  IconSocialTw,
  IconSocialTt,
  IconSocialTg,
  IconSocialFb,
  IconFacebook,
  IconTwitter,
  IconTwitch,
  IconVkNew,
  IconInst,
  IconYt,
  IconTt,
  IconTg,
} from "@icons";
import Image from "next/image";
import { HiUserCircle } from "react-icons/hi";

/**
 * Конфигурация сервисов
 */
export const servicesConfig = {
  twitter: {
    iconNotSocial: (
      <IconTwitter className="sm:w-[36px] sm:h-[36px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialTwitter height={20} width={20} />,
    icon_lg: <IconSocialTwitter height={40} width={40} />,
    icon: <IconSocialTwitter height={24} width={24} />,
    bg: "bg-gradient-twitter",
  },
  yappy: {
    iconNotSocial: (
      <IconTwitter className="sm:w-[36px] sm:h-[36px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialYappy height={20} width={20} />,
    icon_lg: <IconSocialYappy height={40} width={40} />,
    icon: <IconSocialYappy height={24} width={24} />,
    bg: "bg-gradient-twitter",
  },
  vk: {
    iconNotSocial: (
      <IconVkNew className="sm:w-[36px] sm:h-[36px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialVk height={20} width={20} />,
    icon_lg: <IconSocialVk height={40} width={40} />,
    icon: <IconSocialVk height={24} width={24} />,
    bg: "bg-[#2787f5]",
    name: "VK",
  },
  facebook: {
    iconNotSocial: (
      <IconFacebook className="sm:w-[36px] sm:h-[36px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialFb height={20} width={20} />,
    icon_lg: <IconSocialFb height={40} width={40} />,
    icon: <IconSocialFb height={24} width={24} />,
    bg: "bg-gradient-facebook",
  },
  instagram: {
    iconNotSocial: (
      <IconInst className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialInst height={20} width={20} />,
    icon_lg: <IconSocialInst height={40} width={40} />,
    icon: <IconSocialInst height={24} width={24} />,
    bg: "bg-gradient-inst",
  },
  telegram: {
    iconNotSocial: (
      <IconTg className="sm:w-[36px] sm:h-[36px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialTg height={20} width={20} />,
    icon_lg: <IconSocialTg height={40} width={40} />,
    icon: <IconSocialTg height={24} width={24} />,
    bg: "bg-gradient-telegram",
  },
  twitch: {
    iconNotSocial: (
      <IconTwitch className="sm:w-[30px] sm:h-[30px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialTw height={20} width={20} />,
    icon_lg: <IconSocialTw height={40} width={40} />,
    icon: <IconSocialTw height={24} width={24} />,
    bg: "bg-gradient-twitch",
  },
  vkplaylive: {
    iconNotSocial: (
      <IconYt className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialVkPlay height={20} width={20} />,
    icon_lg: <IconSocialVkPlay height={40} width={40} />,
    icon: <IconSocialVkPlay height={24} width={24} />,
    bg: "",
  },
  discord: {
    iconNotSocial: (
      <IconYt className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialDiscord height={20} width={20} />,
    icon_lg: <IconSocialDiscord height={40} width={40} />,
    icon: <IconSocialDiscord height={24} width={24} />,
    bg: "",
  },
  rutube: {
    iconNotSocial: (
      <IconYt className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialRutube height={20} width={20} />,
    icon_lg: <IconSocialRutube height={40} width={40} />,
    icon: <IconSocialRutube height={24} width={24} />,
    bg: "",
  },
  tiktok: {
    iconNotSocial: (
      <IconTt className="sm:w-[36px] sm:h-[36px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialTt height={20} width={20} />,
    icon_lg: <IconSocialTt height={40} width={40} />,
    icon: <IconSocialTt height={24} width={24} />,
    bg: "bg-[#1c181d]",
  },
  youtube: {
    iconNotSocial: (
      <IconYt className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialYt height={20} width={20} />,
    icon_lg: <IconSocialYt height={40} width={40} />,
    icon: <IconSocialYt height={24} width={24} />,
    bg: "bg-red-600",
  },
  trovo: {
    iconNotSocial: (
      <IconYt className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialTrovo height={20} width={20} />,
    icon_lg: <IconSocialTrovo height={40} width={40} />,
    icon: <IconSocialTrovo height={24} width={24} />,
    bg: "",
  },
  nuum: {
    iconNotSocial: (
      <IconYt className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialNuum height={20} width={20} />,
    icon_lg: <IconSocialNuum height={40} width={40} />,
    icon: <IconSocialNuum height={24} width={24} />,
    bg: "",
  },
  kick: {
    iconNotSocial: (
      <IconYt className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialKick height={20} width={20} />,
    icon_lg: <IconSocialKick height={40} width={40} />,
    icon: <IconSocialKick height={24} width={24} />,
    bg: "",
  },
  dzen: {
    iconNotSocial: (
      <IconYt className="sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]" />
    ),
    icon_small: <IconSocialYd height={20} width={20} />,
    icon_lg: <IconSocialYd height={40} width={40} />,
    icon: <IconSocialYd height={24} width={24} />,
    bg: "",
  },
  profile: {
    icon: <HiUserCircle size="24px" />,
    name: "Профиль",
  },
};

export const servicesCategories = (name, locked = false) => {
  switch (name) {
    case "subs":
      return {
        icon: <IconFriends className="fill-[url(#paint0_linear_1699_23340)]" />,
        ru_name: "Подписчики",
      };
    case "premium_subs":
      return {
        icon: <IconServicesPremium className="translate-x-[1px]" />,
        ru_name: "Премиум подписчики",
      };
    case "stream_viewers":
      return {
        icon: <IconStreamViewers />,
        ru_name: "Зрители",
      };
    case "boosts":
      return {
        icon: <IconBoosts />,
        ru_name: "Бусты",
      };
    case "group_subs":
      return {
        ru_name: "Подписчики в группу",
        icon: <IconSubscribers />,
      };
    case "comments":
      return {
        icon: <IconComments />,
        ru_name: "Комментарии",
      };
    case "live_chat":
      return {
        icon: <IconComments />,
        ru_name: "Живой чат",
      };
    case "likes":
      return {
        icon: <IconLike />,
        ru_name: "",
      };
    case "reports":
      return {
        icon: <IconWarning />,
        ru_name: "Жалобы",
      };
    case "friends":
      return {
        icon: <IconFriends className="fill-[url(#paint0_linear_1699_23340)]" />,
        ru_name: "Друзья",
      };
    case "listenings":
      return {
        icon: <IconListenings />,
        ru_name: "Прослушивания",
      };
    case "video_views":
      return {
        ru_name: "Просмотры видео",
        icon: <IconVideo />,
      };
    case "clip_views":
      return {
        ru_name: "Просмотры клипов",
        icon: <IconVkClips />,
      };
    case "post_views":
      return {
        ru_name: "Просмотры постов",
        icon: <IconView />,
      };
    case "reply_comments":
      return {
        ru_name: "Ответы на комментарии",
        icon: <IconAnswers />,
      };
    case "reposts":
      return {
        icon: <IconRepost />,
        ru_name: "Репосты",
      };
    case "poll_votes":
      return {
        icon: <IconPollVotes />,
        ru_name: "Опросы",
      };
    case "reactions":
      return {
        icon: <IconReactions />,
        ru_name: "Реакции",
      };
    case "views":
      return {
        ru_name: "Просмотры",
        icon: <IconVideo />,
      };
    case "auto_post_views":
      return {
        icon: locked ? (
          <IconAutoView className="fill-[#E8EBF1]" />
        ) : (
          <IconAutoView className="fill-[url(#paint0_linear_1699_23327)]" />
        ),
        ru_name: "Автопросмотры",
      };
    case "comment_likes":
      return {
        ru_name: "Лайки комментариев",
        icon: <IconLike />,
      };
    case "retweets":
      return {
        icon: <IconRepost />,
        ru_name: "Ретвиты",
      };
    default:
      return <IconStreamViewers />;
  }
};

export const configIconsReactionsServices = (props = null) => ({
  clapperboard: {
    icon: (
      <Image
        src={ImgReactionClapperboard}
        className="w-6 h-6"
        alt=""
        {...props}
      />
    ),
  },
  screaming: {
    icon: (
      <Image src={ImgReactionScreaming} className="w-6 h-6" alt="" {...props} />
    ),
  },
  vomiting: {
    icon: (
      <Image src={ImgReactionVomiting} className="w-6 h-6" alt="" {...props} />
    ),
  },
  stareyes: {
    icon: (
      <Image src={ImgReactionStareyes} className="w-6 h-6" alt="" {...props} />
    ),
  },
  beaming: {
    icon: (
      <Image src={ImgReactionBeaming} className="w-6 h-6" alt="" {...props} />
    ),
  },
  dislike: {
    icon: (
      <Image src={ImgReactionDislike} className="w-6 h-6" alt="" {...props} />
    ),
  },
  crying: {
    icon: (
      <Image src={ImgReactionCrying} className="w-6 h-6" alt="" {...props} />
    ),
  },
  heart: {
    icon: (
      <Image src={ImgReactionHeart} className="w-6 h-6" alt="" {...props} />
    ),
  },
  like: {
    icon: <Image src={ImgReactionLike} className="w-6 h-6" alt="" {...props} />,
  },
  fire: {
    icon: <Image src={ImgReactionFire} className="w-6 h-6" alt="" {...props} />,
  },
  poop: {
    icon: <Image src={ImgReactionPoop} className="w-6 h-6" alt="" {...props} />,
  },
});

/**
 * Конфиг имен категорий сервисов на русском
 */
export const configServicesRuNameCategories = {
  reply_comments: "Ответы на комментарии",
  comment_likes: "Лайки комментариев",
  group_subs: "Подписчики в группу",
  auto_post_views: "Автопросмотры",
  post_views: "Просмотры постов",
  clip_views: "Просмотры клипов",
  video_views: "Просмотры видео",
  listenings: "Прослушивания",
  stream_viewers: "Зрители",
  comments: "Комментарии",
  live_chat: "Живой чат",
  poll_votes: "Опросы",
  reactions: "Реакции",
  retweets: "Ретвиты",
  views: "Просмотры",
  reposts: "Репосты",
  subs: "Подписчики",
  friends: "Друзья",
  reports: "Жалобы",
  likes: "Лайки",
};

/**
 * Комментарии
 */
export const comments = (params, type = "services") =>
  type === "services"
    ? params?.inputs?.find((elem) => elem.name === "comments")
    : params?.find((elem) => elem.name === "comments");
// Название поля с комментариями
export const commentsName = (params, type = "services") =>
  comments(params, type)?.name;
// Label поля с комментариями
export const commentsText = (params, type = "services") =>
  comments(params, type)?.text;

/**
 * Номер голосования
 */

export const pollVoteAnswers = (params, type = "services") =>
  type === "services"
    ? params?.inputs?.find((elem) => elem.name === "poll_vote_answer")
    : params?.find((elem) => elem.name === "poll_vote_answer");
// Название поля с номером голосования
export const pollVoteAnswersName = (params, type = "services") =>
  pollVoteAnswers(params, type)?.name;
// Label поля с номером голосования
export const pollVoteAnswersText = (params, type = "services") =>
  pollVoteAnswers(params, type)?.text;

// Количество на обычные посты
export const countPerPost = (params, type = "services") =>
  type === "services"
    ? params?.inputs?.find((elem) => elem.name === "count_per_post")
    : params?.find((elem) => elem.name === "count_per_post");
// Название поля с количествами на обычные посты
export const countPerPostName = (params, type = "services") =>
  countPerPost(params, type)?.name;
// Label поля с количествами на обычные посты
export const countPerPostText = (params, type = "services") =>
  countPerPost(params, type)?.text;
// Минимальное значение поля количества на обычные посты
export const countPerPostMin = (params, type = "services") =>
  countPerPost(params, type)?.["min_count"];

// Скорость просмотров в минуту
export const speedPerPost = (params, type = "services") =>
  type === "services"
    ? params?.inputs?.find((elem) => elem.name === "speed_per_post")
    : params?.find((elem) => elem.name === "speed_per_post");
// Название поля со cкоростью просмотров в минуту
export const speedPerPostName = (params, type = "services") =>
  speedPerPost(params, type)?.name;
// Label поля со cкоростью просмотров в минуту
export const speedPerPostText = (params, type = "services") =>
  speedPerPost(params, type)?.text;
// Минимальное значение поля скорости просмотров в минуту
export const speedPerPostMin = (params, type = "services") =>
  speedPerPost(params, type)?.min ?? 1;
// Значение по умолчанию поля скорости просмотров в минуту
export const speedPerPostDefault = (params, type = "services") =>
  speedPerPost(params, type)?.default ?? 1;
// Максимальное значение поля скорости просмотров в минуту
export const speedPerPostMax = (params, type = "services") =>
  speedPerPost(params, type)?.max ?? 100;
// Step поля скорости просмотров в минуту
export const speedPerPostStep = (params, type = "services") =>
  speedPerPost(params, type)?.step ?? 1;

// Количество на рекламные посты
export const countPerAdPost = (params, type = "services") =>
  type === "services"
    ? params?.inputs?.find((elem) => elem.name === "count_per_ad_post")
    : params?.find((elem) => elem.name === "count_per_ad_post");
// Название поля с количествами на рекламные посты
export const countPerAdPostName = (params, type = "services") =>
  countPerAdPost(params, type)?.name;
// Label поля с количествами на рекламные посты
export const countPerAdPostText = (params, type = "services") =>
  countPerAdPost(params, type)?.text;
// Минимальное значение поля количества на рекламные посты
export const countPerAdPostMin = (params, type = "services") =>
  countPerAdPost(params, type)?.["min_count"];

// Скорость просмотров рекламы в минуту
export const speedPerAdPost = (params, type = "services") =>
  type === "services"
    ? params?.inputs?.find((elem) => elem.name === "speed_per_ad_post")
    : params?.find((elem) => elem.name === "speed_per_ad_post");
// Название поля со cкоростью просмотров рекламы в минуту
export const speedPerAdPostName = (params, type = "services") =>
  speedPerAdPost(params, type)?.name;
// Значение по умолчанию поля скорости просмотров рекламы в минуту
export const speedPerAdPostDefault = (params, type = "services") =>
  speedPerAdPost(params, type)?.default;
// Label поля со cкоростью просмотров рекламы в минуту
export const speedPerAdPostText = (params, type = "services") =>
  speedPerAdPost(params, type)?.text;
// Минимальное значение поля скорости просмотров рекламы в минуту
export const speedPerAdPostMin = (params, type = "services") =>
  speedPerAdPost(params, type)?.min ?? 1;
// Максимальное значение поля скорости просмотров рекламы в минуту
export const speedPerAdPostMax = (params, type = "services") =>
  speedPerAdPost(params, type)?.max ?? 100;
// Step поля скорости просмотров рекламы в минуту
export const speedPerAdPostStep = (params, type = "services") =>
  speedPerAdPost(params, type)?.step ?? 1;

/**
 * Слайдер
 *
 * duration_slider - Удержание на видео
 * speed_slider - Скорость просмотров
 */
export const slider = (params, type = "services") =>
  type === "services"
    ? params?.inputs?.find(
        (elem) =>
          elem.name === "duration_slider" ||
          elem.name === "speed_slider" ||
          elem.name === "speed" ||
          elem.name === "interval",
      )
    : params?.find(
        (elem) =>
          elem.name === "duration_slider" ||
          elem.name === "speed_slider" ||
          elem.name === "speed" ||
          elem.name === "interval",
      );
// Название поля слайдера
export const sliderName = (params, type = "services") =>
  slider(params, type)?.name;
// Label поля слайдера
export const sliderText = (params, type = "services") =>
  slider(params, type)?.text;
// Минимальное значение поля слайдера
export const sliderMin = (params, type = "services") =>
  slider(params, type)?.min ?? 1;
// Значение по умолчанию поля слайдера
export const sliderDefault = (params, type = "services") =>
  slider(params, type)?.default ?? 1;
// Максимальное значение поля слайдера
export const sliderMax = (params, type = "services") =>
  slider(params, type)?.max ?? 100;
// Step поля слайдера
export const sliderStep = (params, type = "services") =>
  slider(params, type)?.step ?? 1;

/**
 * Select
 */
export const select = (params, type = "services") =>
  type === "services"
    ? params?.inputs?.find(
        (elem) => elem.name === "interval_choice_dropdown_list",
      )
    : params?.find((elem) => elem.name === "interval_choice_dropdown_list");
// Название поля select
export const selectName = (params, type = "services") =>
  select(params, type)?.name;
// Значение по умолчанию поля select
export const selectDefault = (params, type = "services") =>
  select(params, type)?.default ?? 1;
// Label поля select
export const selectText = (params, type = "services") =>
  select(params, type)?.text;
// Значения select
export const selectValues = (params, type = "services") =>
  select(params, type)?.dropdown;

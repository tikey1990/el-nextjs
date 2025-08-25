import { useGetResponseAuthSocials } from "@apppages/auth/hooks";

import { IconGoogleColor, IconGoogleWhite } from "@apppages/auth/assets/icons";
import "@apppages/auth/assets/styles/authSocialBtns.scss";

/**
 * Компонент кнопок авторизации через соц сети
 * @returns {JSX.Element}
 * @constructor
 */
export const SocialBtns = () => {
  const { loginWithGoogle } = useGetResponseAuthSocials();

  return (
    <div className="w-full flex max-w-[154px] justify-between">
      {/* Google */}
      <button
        className="group relative rounded-full hover:bg-white flex justify-center items-center bg-[rgba(0,159,231,0.08)] transition-all ease-in-out duration-200 w-[46px] h-[46px]"
        onClick={() => loginWithGoogle()}
        aria-label="Google"
      >
        <IconGoogleWhite className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-200" />
        <IconGoogleColor className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </button>

      {/* Vk */}
      {/* <button */}
      {/*     className="group relative rounded-full hover:bg-white flex justify-center items-center bg-[rgba(0,159,231,0.08)] transition-all ease-in-out duration-200 w-[46px] h-[46px]" */}
      {/*     aria-label="Vk" */}
      {/* > */}
      {/*     <IconVkWhite className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-200" /> */}
      {/*     <IconVkColor className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
      {/* </button> */}

      {/* Yandex */}
      {/* <button */}
      {/*     className="group relative rounded-full hover:bg-white flex justify-center items-center bg-[rgba(0,159,231,0.08)] transition-all ease-in-out duration-200 w-[46px] h-[46px]" */}
      {/*     aria-label="Yandex" */}
      {/* > */}
      {/*     <IconYaWhite className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-200" /> */}
      {/*     <IconYaColor className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
      {/* </button> */}
    </div>
  );
};

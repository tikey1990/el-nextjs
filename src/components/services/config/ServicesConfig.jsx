// Components
import Image from "next/image";
// Media
import {
  ImgServicesFormShieldConfirm,
  ImgServicesFormShieldCancel,
  ImgServicesFormRocket,
  ImgServicesFormCursor,
  ImgServicesFormArrow,
  ImgServicesFormCoin,
} from "../assets/images";

/**
 * Конфиг с иконками для качеств сервисов
 */
export const configServicesInfoQuantity = {
  warranty_30_days: {
    icon: (
      <Image
        src={ImgServicesFormShieldConfirm}
        className="w-[30px] h-[30px]"
        height="30"
        width="30"
      />
    ),
  },
  recommendations: {
    icon: (
      <Image
        className="w-[30px] h-[30px]"
        src={ImgServicesFormCursor}
        height="30"
        width="30"
      />
    ),
  },
  canceled: {
    icon: (
      <Image
        src={ImgServicesFormShieldCancel}
        className="w-[30px] h-[30px]"
        height="30"
        width="30"
      />
    ),
  },
  instant_start: {
    icon: (
      <Image
        className="w-[30px] h-[30px]"
        src={ImgServicesFormArrow}
        height="30"
        width="30"
      />
    ),
  },
  speed_limit: {
    icon: (
      <Image
        className="w-[30px] h-[30px]"
        src={ImgServicesFormRocket}
        height="30"
        width="30"
      />
    ),
  },
  source: {
    icon: (
      <Image
        className="w-[30px] h-[30px]"
        src={ImgServicesFormArrow}
        height="30"
        width="30"
      />
    ),
  },
  real: {
    icon: (
      <Image
        className="w-[30px] h-[30px]"
        src={ImgServicesFormArrow}
        height="30"
        width="30"
      />
    ),
  },
  possible_write_offs: {
    icon: (
      <Image
        className="w-[30px] h-[30px]"
        src={ImgServicesFormCoin}
        height="30"
        width="30"
      />
    ),
  },
  no_write_offs: {
    icon: (
      <Image
        className="w-[30px] h-[30px]"
        src={ImgServicesFormCoin}
        height="30"
        width="30"
      />
    ),
  },
};

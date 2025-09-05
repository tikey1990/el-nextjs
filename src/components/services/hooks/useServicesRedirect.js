import { useSelector } from "react-redux";
import { VAR_LINK_ROUTES } from "@vars";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Хук для редиректа на дефолтный тип и качество категории услуги
 */
export const useServicesRedirect = () => {
  const router = useRouter();

  /**
   * Получаем данные из стора о типах и качествах услуг
   */
  const serviceInfo = useSelector((state) => state.services.route?.serviceInfo);
  const qualities = useSelector((state) => state.services.route.qualities);
  const serviceName = useSelector(
    (state) => state.services.route.serviceInfo?.service,
  );

  useEffect(() => {
    if (qualities) {
      const currentFirstType = qualities[0].name;

      // Получаем первое качество категории услуги
      const currentFirstQuality =
        serviceInfo.name === "auto_post_views" ||
        (serviceInfo.name === "post_views" && serviceName === "telegram") ||
        /^stream_/.test(serviceInfo?.name)
          ? qualities[0].quality[0].name
          : qualities[0].quality[0].name.split("_")[0];

      if (!serviceInfo.quality && serviceInfo.type) {
        router.replace(
          `/${VAR_LINK_ROUTES.services}/${serviceInfo.service}/${serviceInfo.name}/${serviceInfo.type}/${currentFirstQuality}`,
        );
      } else if (!serviceInfo.quality && !serviceInfo.type) {
        router.replace(
          `/${VAR_LINK_ROUTES.services}/${serviceInfo.service}/${serviceInfo.name}/${currentFirstType}/${currentFirstQuality}`,
        );
      }
    }
  }, [qualities]);
};

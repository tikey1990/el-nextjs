import {
  IconArrowBottom,
  IconArrowTop,
} from "@components/services/assets/icons";
import { headers } from "next/headers";
import { userAgent } from "next/server";

const ConcreteServicePage = async ({ params }) => {
  const { service } = await params;
  const feesData = await fetch("https://easyliker.ru/api/ajax/fees", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
      Accept: "*/*",
    },
    cache: "force-cache",
    body: "MethodAndForm=getFeesTypes",
  }).then((resp) => {
    return resp.json();
  });
  const service_text = feesData.data.find(
    (item) => item.name === service,
  )?.html_text;
  const headersList = await headers();
  const ua = userAgent({ headers: headersList }); // Is mobile
  const isMobile = ua.device.type === "mobile";
  return (
    <>
      <div className="flex-col flex">
        <div className="flex z-[10] w-full sm:max-h-[158px] flex-wrap sm:flex-nowrap flex-row max-sm:justify-center items-center p-5 sm:p-10 gap-5 sm:gap-10 bg-white shadow-content rounded-2xl">
          {isMobile ? <IconArrowTop /> : <IconArrowBottom />}
          <p className="font-pn-extraboldit text-2xl sm:text-[32px] text-gray-600 max-sm:order-1 max-sm:text-center">
            Выберите тип продвижения
          </p>
          <p className="ml-0 sm:ml-auto font-pn-extraboldit text-lg whitespace-nowrap p-[25px] text-primary-500 bg-[#f0faff] rounded-[53px]">
            Шаг 2
          </p>
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: service_text }} />
        </div>
      </div>
    </>
  );
};

export default ConcreteServicePage;

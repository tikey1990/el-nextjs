import { IconArrowTop } from "@components/services/assets/icons";
import {
  AsideCategoriesServices,
  AsidePage,
} from "@components/aside/components";

const ServicesPage = () => {
  return (
    <>
      <aside className="aside max-sm:w-full sm:min-w-[278px] relative flex flex-nowrap flex-col gap-4">
        <AsidePage />
      </aside>
      <IconArrowTop />
      <div className="flex-col flex">
        <div className="flex z-[10] w-full sm:max-h-[158px] flex-wrap sm:flex-nowrap flex-row max-sm:justify-center items-center p-5 sm:p-10 gap-5 sm:gap-10 bg-white shadow-content rounded-2xl">
          <p className="font-pn-extraboldit text-2xl sm:text-[32px] text-gray-600 max-sm:order-1 max-sm:text-center">
            Выберите социальную сеть для продвижения
          </p>
          <p className="ml-0 sm:ml-auto font-pn-extraboldit text-lg whitespace-nowrap p-[25px] text-primary-500 bg-[#f0faff] rounded-[53px]">
            Шаг 1
          </p>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;

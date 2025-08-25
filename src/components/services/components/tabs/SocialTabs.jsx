"use client";
import { UtilsSocialsTabs, utilsSocialsTabsNew } from "./utils";

/**
 * Компонент списка выбора социальных сетей
 * @returns {JSX.Element}
 * @constructor
 */
const SocialTabs = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap rounded-2xl sm:flex-nowrap justify-center sm:justify-between gap-x-[10px] gap-y-[15px] sm:gap-2 z-[1] mb-[15px] flex-row">
        <UtilsSocialsTabs />
      </div>
      <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-x-[10px] gap-y-[15px] sm:gap-2 z-[1] mb-6 sm:mb-[30px] flex-row">
        {utilsSocialsTabsNew()}
      </div>
    </div>
  );
};

export default SocialTabs;

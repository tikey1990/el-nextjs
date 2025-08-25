import { advPremiumModalConfig } from "../config";

/**
 * Рендер премиум модалки
 * @returns {unknown[]}
 */
export const renderPremiumModalAdv = () =>
  advPremiumModalConfig.map(({ text, icon }, index) => (
    <div
      className="flex flex-row items-center w-full justify-between sm:w-[calc(50%-6px)] p-4 h-[80px] rounded-2xl ring-1 ring-[#CEF0FF]"
      key={index}
    >
      <div className="font-pn-semiboldit text-gray-600 text-sm sm:whitespace-nowrap">
        {text}
      </div>
      {icon}
    </div>
  ));

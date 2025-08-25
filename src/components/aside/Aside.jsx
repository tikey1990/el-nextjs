"use client";
import { VAR_LINK_ROUTES } from "@vars";
import { AsideMassOrdersServices, AsideProfile, AsidePage } from "./components";
import "./assets/styles/aside.scss";
import { usePathname } from "next/navigation";

/**
 * Компонент бокового меню тарифов
 * @returns {JSX.Element}
 * @constructor
 */
const Aside = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside className="aside max-sm:w-full sm:min-w-[278px] relative flex flex-nowrap flex-col gap-4">
      {pathname === VAR_LINK_ROUTES.services && <AsidePage />}
      {pathname === VAR_LINK_ROUTES.profile && <AsideProfile />}

      <AsideMassOrdersServices />
    </aside>
  );
};

export default Aside;

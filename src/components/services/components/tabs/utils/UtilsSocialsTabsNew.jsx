"use client";
import { customThemeTooltip } from "@theme";
import { useSelector } from "react-redux";
import { Tooltip } from "flowbite-react";
import { useTypeDevice } from "@hooks";
import classNames from "classnames";

import { configSocialTabsDataServicesNew } from "../config";
import Link from "next/link";

export const utilsSocialsTabsNew = () => {
  const { isMobile } = useTypeDevice();
  const service = useSelector(
    (state) => state.services.route.serviceInfo?.service,
  );
  const classItem = (elem) =>
    classNames(
      "flex justify-center relative w-[calc(25%-(3/4)*10px)] xs:w-[calc((100%/4)-(4/5)*10px)] sm:w-[calc((100%/8)-(7/8)*0.5rem)] aspect-square sm:aspect-video hover:opacity-90 rounded-2xl cursor-pointer items-center",
      {
        "rounded-2xl pseudoOutlineSafari": service === elem.name,
      },
      elem.bg,
    );
  const configSocialTabsDataServicesNewFiltered =
    configSocialTabsDataServicesNew?.filter((elem) => {
      if (isMobile && elem?.name === "websitetraffic") return null;
      return elem;
    });

  return configSocialTabsDataServicesNewFiltered?.map((elem, index) => (
    <Link className={classItem(elem)} href={elem.name} key={index}>
      <Tooltip theme={customThemeTooltip} content={elem.label} style="light">
        {elem.icon}
      </Tooltip>
    </Link>
  ));
};

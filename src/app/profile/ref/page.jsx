"use client";

import React from "react";

import {
  RefDescription,
  RefTable,
  RefStats,
  RefForm,
} from "@apppages/profile/pages/ref/components";

/**
 * Компонент страницы реферальной системы
 * @returns {JSX.Element}
 * @constructor
 */
const Ref = () => {
  return (
    <div className="w-full max-sm:z-[100] sm:bg-white sm:shadow-content sm:rounded-2xl sm:p-10">
      <RefStats />

      <RefForm />

      <RefDescription />

      <RefTable />
    </div>
  );
};
export default Ref;

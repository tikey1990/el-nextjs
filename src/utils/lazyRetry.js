import { toast } from "react-toastify";
import React from "react";

/**
 * Кастомная обертка над lazy
 * @param importer
 * @returns {React.LazyExoticComponent<React.ComponentType<any>>}
 */
export const lazyReactNaiveRetry = (importer) => {
    const retryImport = async () => {
        try {
            return await importer();
        } catch (error) {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            params.set("t", `${+new Date()}`);

            toast.warning("Ваша сессия устарела. Пожалуйста, обновите страницу", {
                autoClose: 10000,
            });

            throw error;
        }
    };
    return React.lazy(retryImport);
};

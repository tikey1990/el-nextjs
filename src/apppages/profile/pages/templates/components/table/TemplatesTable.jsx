import { useGetTemplatesPageQuery, useCreateOrderMutation } from "@features";
import { useSelector } from "react-redux";
import React, { useState } from "react";

import { useTemplatesIntersection, usePrevTemplates } from "./hooks";
import { utilRenderTemplates } from "./utils";
import { TemplatesZeroData } from "../";

/**
 * Компонент таблицы шаблонов
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesTable = () => {
    const [page, setPage] = useState(1);
    const has_premium_subscription = useSelector((state) => state.profileSettings.has_premium_subscription);

    const getTemplatesPageQuery = useGetTemplatesPageQuery({ page_number: page }, { skip: !has_premium_subscription });
    const { data } = getTemplatesPageQuery;
    const totalTemplatesCount = data?.data?.["total_templates_count"];

    const templates = useSelector((state) => state.profileTemplates.templates);

    /**
     * Redux-хук для создания заказа
     */
    const [, createOrderQuery] = useCreateOrderMutation();

    const { setShowObserverTarget, showObserverTarget, isChangePage, isLoading, isSuccess } = usePrevTemplates(
        getTemplatesPageQuery,
        totalTemplatesCount
    );
    const { observerTarget } = useTemplatesIntersection(setPage, isChangePage, setShowObserverTarget);
    const isShowTemplates = !isLoading && isSuccess && templates?.length > 0 && has_premium_subscription;
    const isShowZeroData = (!isLoading && isSuccess && templates?.length === 0) || !has_premium_subscription;

    return (
        <div className="flex flex-col gap-4">
            {isShowTemplates && <>{utilRenderTemplates(templates, createOrderQuery)}</>}

            {isShowZeroData && (
                <TemplatesZeroData
                    text={
                        has_premium_subscription ? (
                            "Тут еще ничего нет :("
                        ) : (
                            <p>
                                Данный раздел доступен только
                                <br /> пользователям с премиум подпиской
                            </p>
                        )
                    }
                    state={has_premium_subscription ? 2 : 1}
                />
            )}

            <div className={showObserverTarget ? "block" : "hidden"} ref={observerTarget}></div>
        </div>
    );
};

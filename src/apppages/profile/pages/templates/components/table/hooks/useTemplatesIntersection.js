import { useIntersectionObserveElementWithCallback } from "@hooks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setTemplates } from "@features";

export const useTemplatesIntersection = (setPage, isChangePage, setShowObserverTarget) => {
    const observerTarget = useIntersectionObserveElementWithCallback(() => {
        if (isChangePage) {
            setShowObserverTarget(false);
            setPage((prev) => prev + 1);
        }
    }, isChangePage);

    return { observerTarget };
};

export const usePrevTemplates = (getTemplatesPageQuery, totalTemplatesCount) => {
    const templates = useSelector((state) => state.profileTemplates.templates);
    const dispatch = useDispatch();
    const { currentData, isLoading, isSuccess, status } = getTemplatesPageQuery;
    const [showObserverTarget, setShowObserverTarget] = useState(false);

    const isLoadingTemplates = isLoading && templates?.length === 0;
    const isChangePage = totalTemplatesCount > templates?.length;

    useEffect(() => {
        if (!isLoading && isSuccess && currentData && status === "fulfilled") {
            if (templates?.length !== currentData?.data?.["total_templates_count"])
                dispatch(setTemplates(currentData?.data?.["templates_list"]));

            setTimeout(() => {
                setShowObserverTarget(true);
            }, 1000);
        } else setShowObserverTarget(false);
    }, [getTemplatesPageQuery]);

    return {
        setShowObserverTarget,
        showObserverTarget,
        isLoadingTemplates,
        isChangePage,
        currentData,
        isSuccess,
        isLoading,
    };
};

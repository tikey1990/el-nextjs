import { utilFormatNumberWithSpaces } from "@utils";

import { IconRefPeoples, IconRefActive, IconRefCash } from "../assets/icons";

/**
 * Конфиг статистики реферальной системы
 */
export const dataRefStats = (data) => {
    return [
        {
            icon: <IconRefPeoples />,
            count: data?.referrals,
            name: "Рефералов",
        },
        {
            count: data?.active_referrals,
            icon: <IconRefActive />,
            name: "Активных",
        },
        {
            count: (
                <>
                    {utilFormatNumberWithSpaces(data?.total_earned, true).replace(",", ".")}{" "}
                    <span className="font-bold text-[15px]">₽</span>
                </>
            ),
            icon: <IconRefCash />,
            name: "Заработано",
        },
    ];
};

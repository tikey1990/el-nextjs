import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { animated } from "react-spring";

import { infoRoute } from "../../../config";

const Deposit = lazyReactNaiveRetry(() => import("../Deposit"));

/**
 * Маршруты пополнения баланса
 */
export const DepositRoutes = [
    {
        element: (
            <DecoratorSuspense animation>
                {(props) => (
                    // eslint-disable-next-line react/prop-types
                    <animated.section className="w-full z-10" style={props?.style}>
                        <Deposit />
                    </animated.section>
                )}
            </DecoratorSuspense>
        ),
        handle: {
            ...infoRoute,
            childrenRus: "Пополнить баланс",
        },
        path: "deposit",
    },
];

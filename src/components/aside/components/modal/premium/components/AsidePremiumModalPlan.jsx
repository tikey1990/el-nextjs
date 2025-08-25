import { useSpring, animated } from "react-spring";
import { RadioGroup } from "@headlessui/react";
import { IconRuble } from "@icons";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Fragment } from "react";

/**
 * Компонент выбора плана
 * @param plans
 * @param plan
 * @param setPlan
 * @returns {JSX.Element}
 * @constructor
 */
export const AsidePremiumModalPlan = ({ setPlan, plans, plan }) => {
  const classSelect = (checked) =>
    classnames(
      "bg-white w-full sm:w-[80%] cursor-pointer !border-none transition-all !outline-none ease-in-out duration-150 flex justify-between rounded-2xl ring-1 ring-gray-200 items-center py-3 px-4",
      {
        "!ring-0 borderGrad": checked,
      },
    );

  const classChecked = (checked) =>
    classnames(
      "w-5 h-5 flex items-center !border-none !outline-none justify-center transition-all ease-in-out duration-150 rounded-full ring-1 ring-[#CAECFC]",
      {
        "!ring-primary-500": checked,
      },
    );

  return (
    <RadioGroup
      className="felx flex-col gap-6 mt-6"
      onChange={setPlan}
      value={plan}
      by="id"
    >
      <RadioGroup.Label className="text-primary-500 text-[20px] font-pn-boldit inline-flex justify-center mb-6 text-center w-full">
        Выберите план подписки
      </RadioGroup.Label>

      <div className="flex flex-col items-center gap-2">
        {Array.isArray(plans) &&
          plans?.map((plan) => (
            <RadioGroup.Option key={plan.id} as={Fragment} value={plan}>
              {({ checked }) => {
                const animation = useSpring({
                  to: {
                    height: checked ? "12px" : "2px",
                    width: checked ? "12px" : "2px",
                    opacity: checked ? 1 : 0,
                  },
                  config: {
                    duration: 100,
                  },
                });

                return (
                  <div className={classSelect(checked)}>
                    <div className="flex flex-row items-center gap-3">
                      <div className={classChecked(checked)}>
                        {checked && (
                          <animated.div
                            className="bg-gradient-blue-500 rounded-full"
                            style={animation}
                          />
                        )}
                      </div>
                      <p className="text-[16px] font-pn-semibold text-gray-600">
                        {plan.duration}
                      </p>
                    </div>

                    <div className="flex flex-row items-center gap-3">
                      {plan.discount > 0 && (
                        <div className="bg-gradient-blue-500 rounded-[8px] w-[50px] h-[26px] flex text-white text-sm font-pn-bold items-center justify-center">
                          -{plan.discount}%
                        </div>
                      )}

                      <p className="text-[16px] w-[55px] sm:w-[50px] justify-end font-pn-boldit text-gray-600 inline-flex items-center gap-0.5">
                        {plan.price}
                        <IconRuble className="fill-gray-600 w-[11px] h-[11px]" />
                      </p>
                    </div>
                  </div>
                );
              }}
            </RadioGroup.Option>
          ))}
      </div>
    </RadioGroup>
  );
};

AsidePremiumModalPlan.propTypes = {
  /**
   * State plan set
   */
  setPlan: PropTypes.func,

  /**
   * State plan
   */
  plan: PropTypes.object,

  /**
   * State plans
   */
  plans: PropTypes.array,
};

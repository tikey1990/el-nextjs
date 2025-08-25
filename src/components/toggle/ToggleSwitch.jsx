"use client";
import { IconToggleDisabled, IconToggleOff, IconToggleOn } from "@icons";
import { useSpring, animated } from "react-spring";
import { Switch } from "@headlessui/react";
import PropTypes from "prop-types";
import React from "react";

export const ToggleSwitch = ({ ...props }) => {
  const { disabled, checked } = props;

  // Создаем анимацию для иконок
  const toggleAnimation = useSpring({
    to: { transform: checked ? "translateX(24px)" : "translateX(0px)" },
    config: { duration: 150, tension: 150 },
    from: { transform: "translateX(0px)" },
    immediate: disabled,
  });

  return (
    <Switch
      className={`relative min-w-[60px] w-[60px] outline-none h-[30px] bg-[#FCFCFD] shadow-input border border-[#E8EBF1] inline-flex px-[5px] items-center rounded-2xl ${props.className}`}
      {...props}
    >
      {({ checked }) => (
        <animated.div style={toggleAnimation}>
          {checked ? (
            props.disabled ? (
              <IconToggleDisabled />
            ) : (
              <IconToggleOn />
            )
          ) : props.disabled ? (
            <IconToggleDisabled />
          ) : (
            <IconToggleOff />
          )}
        </animated.div>
      )}
    </Switch>
  );
};

ToggleSwitch.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
};

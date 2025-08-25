"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chatra from "@chatra/chatra";
import { useAuth } from "@hooks";

/**
 * Утилита для загрузки chatra
 */
export const utilLoadChatra = () => {
  const { isAuth } = useAuth();
  const [firstChatraInit, setFirstChatraInit] = useState(false);

  /**
   * Store
   */
  const email = useSelector((state) => state.profileSettings.email);
  const balance = useSelector((state) => state.profileSettings.balance);

  let config = {
    setup: {
      colors: {
        buttonText: "#ffffff" /* цвет текста кнопки чата */,
        buttonBg: "#009FE7" /* цвет фона кнопки чата */,
      },
      zIndex: 50,
    },
    integration: {
      // prettier-ignore
      "Баланс":  balance,
      email: email,
    },
    ID: "GksNSRSumDJkdfnHq",
  };

  useEffect(() => {
    if (email !== null && balance !== undefined && isAuth && !firstChatraInit) {
      Chatra("init", config);
      setFirstChatraInit(true);
    } else if (!isAuth && email !== null && balance !== undefined);
    Chatra("init", {
      setup: {
        colors: {
          buttonText: "#ffffff" /* цвет текста кнопки чата */,
          buttonBg: "#009FE7" /* цвет фона кнопки чата */,
        },
        zIndex: 50,
      },
      ID: "GksNSRSumDJkdfnHq",
    });
  }, [email, balance, isAuth]);

  useEffect(() => {
    if (email !== null && balance !== undefined)
      Chatra("updateIntegrationData", {
        // prettier-ignore
        "Баланс": balance,
        email: email,
      });
  }, [email, balance, isAuth]);
};

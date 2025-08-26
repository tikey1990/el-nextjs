"use client";
import { VAR_HAS_PREMIUM_VISUAL_MODE, VAR_LINK_ROUTES } from "@vars";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { IconRuble } from "@icons";
import { setPrevBalance, useGetBalanceMutation } from "@features";
import { useAuth, useTypeDevice } from "@hooks";
import { CountUp } from "@components";
import classnames from "classnames";
import { useEffect } from "react";

import { IconCoinsPremium, IconCoins, IconPlus } from "../assets/icons";

/**
 * Компонент блока просмотра баланса
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideBal = () => {
  const { isAuth } = useAuth();
  const { isMobile } = useTypeDevice();
  const router = useRouter();
  const dispatch = useDispatch();
  const isCheckedVisualMode = VAR_HAS_PREMIUM_VISUAL_MODE();
  const [getBalance] = useGetBalanceMutation();

  /**
   * Получаем текущий баланс из store
   */
  const balance = useSelector((state) => state.profileSettings.balance);
  const prevBalance = useSelector((state) => state.profileSettings.prevBalance);

  // При изменении баланса, устанавливаем предыдущий баланс через 1 секунду, чтобы убрать анимацию.
  useEffect(() => {
    if (prevBalance !== balance)
      setTimeout(() => dispatch(setPrevBalance(balance)), 1000);
  }, [balance, prevBalance]);

  useEffect(() => {
    getBalance();
  }, []);

  const handleClickBal = () =>
    isMobile &&
    router.push(`/${VAR_LINK_ROUTES.profile}/${VAR_LINK_ROUTES.deposit}`);

  const iconCoins = () => {
    if (isCheckedVisualMode) return <IconCoinsPremium />;
    return <IconCoins />;
  };

  const classBalWrapper = classnames(
    "h-[60px] flex flex-row items-center gap-[14px] sm:gap-[12px] shadow-content max-sm:cursor-pointer py-5 px-[25px] bg-white rounded-2xl",
    { "bg-gradient-premium": isCheckedVisualMode },
  );

  const classBalContainer = classnames(
    "font-pn-semibold leading-none text-gray-600 flex flex-row text-[16px] items-end gap-2",
    {
      "text-white font-pn-bold text-[15px]": isCheckedVisualMode,
    },
  );

  const classBal = classnames(
    "flex flex-row items-end leading-none gap-0.5 text-primary-500 text-sm font-pn-bold",
    {
      "text-white text-[15px]": isCheckedVisualMode,
    },
  );

  const classIconRuble = classnames(
    "fill-primary-500 w-[11px] h-[11px] -translate-y-[2.5px]",
    {
      "fill-white": isCheckedVisualMode,
    },
  );

  const classIconPlus = classnames(
    "ml-auto fill-[url(#paint0_linear_1947_23391)]",
    {
      "fill-white": isCheckedVisualMode,
    },
  );

  return (
    <>
      {isAuth && (
        <div className={classBalWrapper} onClick={handleClickBal}>
          {iconCoins()}

          <p className={classBalContainer}>
            Ваш баланс:
            <span className={classBal}>
              <CountUp
                value={Number(balance ?? 0)}
                start={Number(prevBalance)}
              />
              <IconRuble className={classIconRuble} />
            </span>
          </p>

          {isMobile && <IconPlus className={classIconPlus} />}
        </div>
      )}
    </>
  );
};

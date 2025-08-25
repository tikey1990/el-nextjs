import { classesTvStatistic } from "@apppages/home/components/statistic/styles";

import "./styles/statistic.scss";

/**
 * Компонент блока "Преимущества"
 * @returns {JSX.Element}
 * @constructor
 */
export const Statistic = () => {
  const {
    tvStatisticTextDescription,
    tvHomeStatisticWrapper,
    tvHomeStatisticElem,
    tvStatisticTextStat,
    tvHomeStatistic,
  } = classesTvStatistic();

  return (
    <div className={`${tvHomeStatistic()} opacity-100`}>
      <div className={tvHomeStatisticWrapper()}>
        {/* Заказы */}
        <div className={tvHomeStatisticElem()}>
          <p className={tvStatisticTextStat()}>1.3 млн +</p>
          <p className={tvStatisticTextDescription()}>
            выполненных
            <br /> заказов
          </p>
        </div>

        {/* Отзывы */}
        <div className={tvHomeStatisticElem()}>
          <p className={tvStatisticTextStat()}>1978</p>
          <p className={tvStatisticTextDescription()}>
            положительных
            <br /> отзывов
          </p>
        </div>
      </div>

      <div className={tvHomeStatisticWrapper()}>
        {/* Кол-во зарегистрированных пользователей */}
        <div className={tvHomeStatisticElem()}>
          <p className={tvStatisticTextStat()}>92 000 +</p>
          <p className={tvStatisticTextDescription()}>
            зарегистрированных
            <br /> пользователей
          </p>
        </div>

        {/* Кол-во услуг */}
        <div className={tvHomeStatisticElem()}>
          <p className={tvStatisticTextStat()}>57</p>
          <p className={tvStatisticTextDescription()}>
            услуг
            <br /> по накрутке
          </p>
        </div>
      </div>
    </div>
  );
};

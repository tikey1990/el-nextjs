"use client";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

/**
 * Хук для таймера с обратным отсчетом
 * @param targetDate
 * @param startDate
 * @returns {{timeString: string, percent: *|number}|{timeString: string, percent: number}}
 */
export const useCountdown = (startDate, targetDate) => {
  const start = moment.tz(startDate, "Europe/Moscow");
  const target = moment.tz(targetDate, "Europe/Moscow");
  const totalDuration = target.diff(start);

  const calculateTimeLeft = () => {
    const now = moment.tz("Europe/Moscow");
    const difference = target.diff(now);
    const elapsed = now.diff(start);
    const percent = Math.max(100 - (elapsed / totalDuration) * 100, 0);

    if (difference > 0) {
      const duration = moment.duration(difference);
      const timeString =
        duration.asDays() >= 1
          ? `${duration.days()} дней ${duration.hours().toString().padStart(2, "0")}:${duration
              .minutes()
              .toString()
              .padStart(
                2,
                "0",
              )}:${duration.seconds().toString().padStart(2, "0")}`
          : `${duration.hours().toString().padStart(2, "0")}:${duration.minutes().toString().padStart(2, "0")}:${duration
              .seconds()
              .toString()
              .padStart(2, "0")}`;

      return { timeString, percent };
    } else {
      return { timeString: "Время истекло!", percent: 0 };
    }
  };

  const [timeData, setTimeData] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeData(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return timeData;
};

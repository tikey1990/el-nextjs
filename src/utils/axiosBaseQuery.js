import { VAR_IS_MODE_PREDPROD_OR_PROD, VAR_API_URL } from "@vars";
import { useSearchParamsToObject } from "@hooks";
import { toast } from "react-toastify";
import axios from "axios";

const getCookieAuth = () => {
  return document.cookie.split(";").reduce((res, c) => {
    const [key, val] = c.trim().split("=").map(decodeURIComponent);
    const allNumbers = (str) => /^\d+$/.test(str);
    try {
      return Object.assign(res, {
        [key]: allNumbers(val) ? val : JSON.parse(val),
      });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {}).auth;
};

/**
 * Утилита для получения данных через axios
 */
export const axiosBaseQuery =
  (baseUrl = VAR_API_URL) =>
  async ({ method, data, url }) => {
    try {
      const result = await axios({
        headers: {
          Authorization: `Bearer ${getCookieAuth()}`,
          "content-type": "application/x-www-form-urlencoded",
          "x-requested-with": "XMLHttpRequest",
          Accept: "*/*",
        },
        method: method || "POST",
        url: baseUrl + url,
        data,
      });
      return { data: result.data };
    } catch (e) {
      const searchParams = useSearchParamsToObject(e?.config?.data);
      const error = VAR_IS_MODE_PREDPROD_OR_PROD
        ? e?.response?.data?.error
        : e?.message;

      if (
        searchParams?.MethodAndForm !== "CreateOrder" ||
        searchParams?.source !== "massorders"
      ) {
        const isOrderError = searchParams.MethodAndForm === "CreateOrder";
        const isLongError = error.split(" ").length > 6;

        const timeoutProps = () => {
          if (isOrderError)
            return {
              autoClose: 5000,
            };
          else if (isLongError)
            return {
              bodyStyle: {
                minWidth:
                  localStorage.getItem("isMobile") === "false"
                    ? "450px"
                    : "initial",
                padding: "15px",
              },
              autoClose: 7000,
            };
          else return { autoClose: 4000 };
        };

        toast.error(error, timeoutProps());
      }

      return {
        error: {
          data: e.response?.data || e.message,
          status: e.response?.status,
        },
      };
    }
  };

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      toast.warning("Ваша сессия устарела. Пожалуйста, обновите страницу", {
        autoClose: 10000,
      });
    }
    return Promise.reject(error);
  },
);

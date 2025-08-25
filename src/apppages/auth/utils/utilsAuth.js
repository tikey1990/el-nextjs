import { useAuthWithSocialsMutation, setToken } from "@features";
import { utilYMRegistration, utilAuthSetTokens } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import { useTypeDevice } from "@hooks";
import { VAR_LINK_ROUTES } from "@vars";
import { toast } from "react-toastify";
import { useEffect } from "react";
import * as yup from "yup";
import { usePathname, useRouter } from "next/navigation";

/**
 * Схема валидации для формы регистрации
 */
export const validationSchemeReg = yup.object({
  password: yup
    .string()
    .required("Поле должно быть заполнено!")
    .min(5, "Пароль должен быть не короче 5 символов")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Пароль должен сдержать латинские символы или числа",
    ),
  email: yup
    .string()
    .required("Поле должно быть заполнено!")
    .matches(/@/, "Поле должно быть вида example@mail.com"),
});

/**
 * Утилита для авторизации пользователя через соц сети
 */
export const utilAuthLoginWithSocials = (refCode) => {
  const pathname = usePathname();
  const { isMobile } = useTypeDevice();
  const router = useRouter();
  const dispatch = useDispatch();
  const loginSocialsResponse = useSelector(
    (state) => state.auth.loginSocialsResponse,
  );

  const [authWithSocials] = useAuthWithSocialsMutation();

  useEffect(() => {
    if (loginSocialsResponse)
      authWithSocials({
        utm_source: localStorage.getItem("utm_source") ?? "direct_entry",
        auth_method: loginSocialsResponse?.authMethod,
        code: loginSocialsResponse?.code,
        ref_code: refCode ?? null,
      }).then((response) => {
        utilAuthSetTokens(response.data.data);
        router.push(`/${VAR_LINK_ROUTES.services}`);
        dispatch(setToken(response.data.data.token));
        utilYMRegistration();

        if (pathname === VAR_LINK_ROUTES.login && response.data.data)
          toast.success("Вы успешно авторизовались");
        else if (
          pathname === VAR_LINK_ROUTES.register &&
          response.data.data &&
          !isMobile
        )
          toast.success("Вы успешно зарегистрировались");
      });
  }, [loginSocialsResponse]);
};

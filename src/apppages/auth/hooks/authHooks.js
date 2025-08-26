"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { setLoginSocialsResponse } from "@features";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "@/providers/auth";

/**
 * Хук для получения response авторизации через соц сети
 * @returns {{tokenResponse: unknown, loginWithGoogle: () => void}}
 */
export const useGetResponseAuthSocials = () => {
  const { host: currentDomain } = useContext(AuthContext);
  const dispatch = useDispatch();

  const loginWithGoogle = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    onSuccess: (tokenResponse) =>
      dispatch(
        setLoginSocialsResponse({ ...tokenResponse, authMethod: "google" }),
      ),
    redirect_uri: `${currentDomain}/auth/google`,
    flow: "auth-code",
    ux_mode: "popup",
  });

  return { loginWithGoogle };
};

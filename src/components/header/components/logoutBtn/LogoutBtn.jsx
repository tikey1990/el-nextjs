"use client";
import { Button } from "flowbite-react";
import { utilAuthLogout } from "@utils";
import IconLogin from "@components/header/assets/icons/icon-login.svg";
import { useAppDispatch, useAuth } from "@hooks";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <>
      {isAuth ? (
        <Button
          onClick={() => utilAuthLogout(dispatch, router.push)}
          className="py-[14px] px-[25px] h-[44px]"
          color="secondaryTransparent"
          size="custom"
        >
          <IconLogin />
        </Button>
      ) : null}
    </>
  );
};

export default LogoutBtn;

import { useConfirmEmailMutation } from "@features";
import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { VAR_LINK_ROUTES } from "@vars";
import { Modal } from "@components";
import { useAuth } from "@hooks";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Компонент подтверждения почты
 * @constructor
 */
export const ProfileChangeEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuth } = useAuth();
  const [modal, setModal] = useState(true);

  /**
   * Отправка запроса на восстановление пароля
   */
  const [changeEmail, changeEmailQuery] = useConfirmEmailMutation();
  const { isSuccess, isLoading } = changeEmailQuery;

  // Ключ подтверждение email из get параметра
  const confirmEmailKey = searchParams.get("confirm_email_key");

  /**
   * Если запрос на подтверждение прошёл успешно, то закрываем модальное окно
   */
  useEffect(() => {
    if (!isLoading && isSuccess) {
      router.push(`/${VAR_LINK_ROUTES.profile}/${VAR_LINK_ROUTES.settings}`);
    }
  }, [changeEmailQuery]);

  /**
   * Подтверждение почты
   */
  const onClickConfirm = () => {
    changeEmail({
      key: confirmEmailKey,
    });
  };

  return (
    <>
      {/* Модальное окно с формой */}
      {isAuth && confirmEmailKey && (
        <Modal
          className="max-sm:max-h-[calc(100vh-2rem)] max-sm:w-[90%] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:-translate-y-[70px]"
          setOpenModal={setModal}
          openModal={modal}
        >
          {/* Заголовок */}
          <h3 className="mb-8 text-2xl text-gray-600 font-pn-boldit">
            Подтверждение почты
          </h3>

          <Button
            onClick={onClickConfirm}
            className="w-full"
            color="primary"
            type="submit"
            size="md"
          >
            Подтвердить
          </Button>
        </Modal>
      )}
    </>
  );
};

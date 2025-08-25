import { toast } from "react-toastify";

/**
 * Утилита для копирования текста в буфер обмена с уведомлением
 * @param text
 * @param toastTextSuccess
 * @param toastTextError
 * @param withToast
 */
export const utilCopyText = (text, toastTextSuccess, toastTextError, withToast = true) => {
    navigator.clipboard
        .writeText(text)
        .then(() => withToast && toast.success(toastTextSuccess))
        .catch(() => withToast && toast.error(toastTextError));
};

import CryptoJS from "crypto-js";

/**
 * Хук для шифрования ключа каптчи
 * @param message
 */
export const useEncryptCaptcha = (message) => {
    const key = CryptoJS.lib.WordArray.random(256 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encryptedCaptchaKey = CryptoJS.AES.encrypt(message, key, {
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
        iv: iv,
    }).toString();

    return { encryptedCaptchaKey, key, iv };
};

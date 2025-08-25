/**
 * Утилита делает заглавную букву в строке
 */
export const capitalizeFirstLetter = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

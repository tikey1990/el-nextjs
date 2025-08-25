/**
 * Utility function for formatting a number
 * @param {string} str The number to format
 * @param {boolean} keepDecimals Whether or not to retain decimal points (default is false)
 * @returns {string} The formatted number or error message if input is not a number
 */
export const utilFormatNumberWithSpaces = (str, keepDecimals = false) => {
    if (isNaN(Number(str))) {
        return "0.00";
    }

    let num = parseFloat(str); // parsing the string as a floating point number

    // Determine the number of decimal places to keep
    let decimalPlaces = 0;
    if (keepDecimals && str.includes(".")) {
        decimalPlaces = str.split(".")[1].length > 0 ? 2 : 0;
    }

    return num.toLocaleString("ru", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
};

import { toast } from "react-toastify";

/**
 * Calls the `toast.success` function when a query is fulfilled, and calls the `toast.error` function when a query is rejected.
 *
 * @param {Promise} queryFulfilled - The promise to be fulfilled.
 * @param {string} [thenMessage=""] - The message displayed in the success toast.
 */
export const utilCallToastOnQueryFulfilled = (queryFulfilled, thenMessage = "") => {
    if (thenMessage.length > 0) queryFulfilled.then(() => toast.success(thenMessage));
};

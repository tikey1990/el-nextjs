export const useSearchParamsToObject = (searchParams) => {
    let params = new URLSearchParams(searchParams);

    let jsonObject = {};
    for (let [key, value] of params) {
        jsonObject[key] = value;
    }

    return jsonObject;
};

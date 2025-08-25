export const utilScrollTop = () =>
    document.querySelector(".app").scrollTo({
        behavior: "instant",
        left: 0,
        top: 0,
    });

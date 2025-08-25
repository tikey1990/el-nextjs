/**
 * Утилита для форматирования даты
 * @param {string} dateString - Дата
 * @param {boolean} newline - Нужно ли переносить дату на следующую строку
 * @returns {string}
 */
export const utilFormatDate = (dateString, newline = false) => {
    // Создаём объект Date из строки
    let date = new Date(dateString);

    // Массив месяцев для отображения в формате 'сентябрь'
    let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    // Форматируем дату
    return (
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        ":" +
        ("0" + date.getSeconds()).slice(-2) +
        (newline ? "<br />" : " ") +
        date.getDate() +
        " " +
        months[date.getMonth()] +
        (newline ? "<br />" : " ")
    );
};

export const utilFormatDateWithZero = (dateString) => {
    let date = new Date(dateString);

    let day = date.getDate();
    if (day < 10) day = "0" + day;

    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;

    let year = date.getFullYear();

    return day + "." + month + "." + year;
};

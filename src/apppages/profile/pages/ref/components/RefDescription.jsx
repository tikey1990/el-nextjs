/**
 * Компонент описания реферальной системы
 * @returns {JSX.Element}
 * @constructor
 */
export const RefDescription = () => {
    return (
        <div className="flex flex-col gap-6 sm:gap-4 mb-5 sm:mb-10 max-sm:bg-white max-sm:shadow-content max-sm:px-5 max-sm:py-6 max-sm:rounded-2xl">
            {/* Рефералы */}
            <div className="flex flex-col gap-2 sm:bg-[#E6F6FD] sm:rounded-2xl sm:p-[22px]">
                <p className="text-[16px] font-pn-semibold text-primary-500">Рефералы</p>
                <p className="text-sm sm:text-[16px] font-pn-regular text-gray-600">
                    Создайте уникальную ссылку, отправьте ее другу в любом мессенджере или поделитесь в соцсетях. Пришедший друг по вашему
                    приглашению записывается как реферал.
                </p>
            </div>

            {/* Бонусы */}
            <div className="flex flex-col gap-2 sm:bg-[#E6F6FD] sm:rounded-2xl sm:p-[22px]">
                <p className="text-[16px] font-pn-semibold text-primary-500">Бонусы</p>
                <p className="text-sm sm:text-[16px] font-pn-regular text-gray-600">
                    Посмотреть размер бонусов за приглашение можно в личном кабинете. Доход от пополнений ваших активных рефералов
                    автоматически добавляется на баланс сайта. Активным рефералом считается пользователь, пополнивший баланс сайта на 100 ₽.
                </p>
            </div>

            {/* Вознаграждение */}
            <div className="flex flex-col gap-2 sm:bg-[#E6F6FD] sm:rounded-2xl sm:p-[22px]">
                <p className="text-[16px] font-pn-semibold text-primary-500">Вознаграждение</p>
                <p className="text-sm sm:text-[16px] font-pn-regular text-gray-600">
                    Вознаграждение от пополнений реферала высчитывается из количества привлеченных пользователей. Чем больше у тебя активных
                    рефералов - тем больше вознаграждение.
                </p>
            </div>
        </div>
    );
};

import { Outlet } from "react-router-dom";

/**
 * Layout раздела "Мои заказы" на странице "Профиль"
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileOrdersLayout = () => {
    return (
        <div className="orders">
            <Outlet />
        </div>
    );
};

export default ProfileOrdersLayout;

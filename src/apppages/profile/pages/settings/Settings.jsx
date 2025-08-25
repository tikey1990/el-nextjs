import { ProfileChangeEmail, SettingsPassword, SettingsTgKey, SettingsEmail } from "@pages/profile/pages/settings/components/index.js";
import { SettingsUi } from "@pages/profile/pages/settings/components/SettingsUi.jsx";

/**
 * Страница настроек профиля
 * @constructor
 */
const Settings = () => {
    return (
        <div className="flex flex-col gap-5 max-sm:z-[100]">
            <ProfileChangeEmail />

            {/* Ключ telegram */}
            <SettingsTgKey />

            {/* Секция с почтой */}
            <SettingsEmail />

            <div className="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-4">
                {/* Секция с паролем */}
                <SettingsPassword />

                {/* UI */}
                <SettingsUi />
            </div>
        </div>
    );
};

export default Settings;

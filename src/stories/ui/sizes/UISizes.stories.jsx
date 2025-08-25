import "../../assets/styles/colors.scss";
import "../../assets/styles/ui.scss";

export default {
    title: "UI/Sizes",
};

// Компонент UI
export const UISizes = {
    render: () => (
        <div className="ui">
            {/* Секция с размерами отступов */}
            <div className="container__sizes">
                <h2 className="ui-title">Отступы</h2>

                <div className="elem-size elem-size-sm">size-sm</div>
                <div className="elem-size elem-size-md">size-md</div>
                <div className="elem-size elem-size-lg">size-lg</div>
                <div className="elem-size elem-size-xl">size-xl</div>
                <div className="elem-size elem-size-2xl">size-2xl</div>
                <div className="elem-size elem-size-3xl">size-3xl</div>
                <div className="elem-size elem-size-4xl">size-4xl</div>
            </div>
        </div>
    ),
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1699-24978&t=MCjlVjCI7rcMCCaO-4",
            type: "figma",
        },
    },
};

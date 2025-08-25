import "../../assets/styles/shadows.scss";
import "../../assets/styles/ui.scss";

export default {
    title: "UI/Shadows",
};

export const UIShadows = {
    render: () => (
        <div className="shadows">
            <h2 style={{ marginBottom: 0 }} className="ui-title">
                Тени
            </h2>

            <div className="shadow-block shadow-block--one">Тень №1</div>
            <div className="shadow-block shadow-block--two">Тень №2</div>
            <div className="shadow-block shadow-block--three">Тень №3</div>
            <div className="shadow-block shadow-block--four">Тень №4</div>
        </div>
    ),
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1699-37582&t=EfqEFnGgx4Xj8gMl-4",
            type: "figma",
        },
    },
};

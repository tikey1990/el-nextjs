import "../../assets/styles/typography.scss";
import "../../assets/styles/ui.scss";

export default {
    title: "UI/Typography",
};

export const UITypography = {
    render: () => (
        <div className="typography">
            <p style={{ marginBottom: 0 }} className="ui-title">
                Типографика
            </p>

            <div className="typography__container">
                <p className="typography-subtitle">Заголовки</p>

                <h1>Headline 1</h1>
                <h2>Headline 2</h2>
                <h3>Headline 3</h3>
                <h4>Headline 4</h4>
            </div>

            <div className="typography__container">
                <p className="typography-subtitle">Текст</p>

                <p className="text-sm">Text sm</p>
                <p className="text-sm-bold">Text sm bold</p>
                <p className="text-md">Text md</p>
                <p className="text-md-bold">Text md bold</p>
            </div>
        </div>
    ),
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1699-36929&t=nP2ZEOOs2bGWEm9j-4",
            type: "figma",
        },
    },
};

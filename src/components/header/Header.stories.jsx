
import HeaderComponent from "./Header";
import {withRouter} from "@storybook/nextjs/router.mock";

export default {
    decorators: [
        withRouter,
        (Story) => {
            // Убираем отступы со страницы
            window.document.body.style.padding = "0";

            return <Story />;
        },
    ],
    parameters: {
        reactRouter: [
            {
                component: <HeaderComponent />,
                routePath: "/",
            },
        ],
    },
    title: "Components/Header",
    component: HeaderComponent,
};

export const Header = {
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1850-36928&t=rCJ4z6M52d0pWoWY-4",
            type: "figma",
        },
    },

    render: () => <HeaderComponent />,
};

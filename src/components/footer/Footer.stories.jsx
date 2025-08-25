

import FooterComponent from "./Footer";
import {withRouter} from "@storybook/nextjs/router.mock";

export default {
    decorators: [
        withRouter,
        (Story) => {
            // Убираем отступы со страницы
            window.document.body.style.padding = "0";
            window.document.body.style.paddingTop = "20px";

            return (
                <div className="app">
                    <main className="main"></main>
                    <Story />
                </div>
            );
        },
    ],
    parameters: {
        reactRouter: [
            {
                component: <FooterComponent />,
                path: "/",
            },
        ],
    },
    title: "Components/Footer",
    component: FooterComponent,
};

export const Footer = {
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1850-36927&t=lERLtbd5vdMQ8kMi-4",
            type: "figma",
        },
    },

    render: () => <FooterComponent />,
};

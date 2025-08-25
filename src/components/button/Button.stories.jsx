import { Button as ButtonComponent } from "./Button";

export default {
    argTypes: {
        variant: {
            options: ["primary", "secondary", "cancel", "transparent", "custom"],
            control: { type: "radio" },
        },
        size: {
            options: ["large", "normal", "medium", "small"],
            control: { type: "radio" },
        },
        disabled: {
            control: { type: "radio" },
            options: [true, false],
        },
        children: {
            control: { type: "text" },
        },
        props: {
            control: { type: "object" },
        },
    },
    title: "Components/Buttons/Button",
    component: ButtonComponent,
};

export const Button = {
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1699-36929&t=rCJ4z6M52d0pWoWY-4",
            type: "figma",
        },
    },

    args: {
        variant: "primary",
        children: "Кнопка",
        disabled: false,
        size: "large",
        props: {},
    },

    render: (args) => <ButtonComponent {...args} />,
};

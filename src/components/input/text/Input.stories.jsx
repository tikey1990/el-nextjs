import { WithRHF } from "@stories/decorators";

import { Input as InputComponent } from "./Input";

export default {
    title: "Components/Inputs/Input",
    element: InputComponent,
    decorators: [WithRHF],
};

export const Input = {
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1947-37452&t=YsYqeHdOzJRNriJ5-4",
            type: "figma",
        },
    },

    args: {
        placeholder: "Поле ввода",
        name: "input",
        options: {},
    },

    render: (args) => <InputComponent {...args} />,
};

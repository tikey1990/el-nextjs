import { WithRHF } from "@stories/decorators";

import { Checkbox as CheckboxComponent } from "./Checkbox";

export default {
    argTypes: {
        position: {
            control: { type: "radio" },
            options: ["left", "right"],
        },
    },
    title: "Components/Inputs/Checkbox",
    element: CheckboxComponent,
    decorators: [WithRHF],
};

export const Checkbox = {
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?type=design&node-id=1947-23209&t=J2Q1v4ELUBHj9ft7-4",
            type: "figma",
        },
    },

    args: {
        children: "Checkbox",
        position: "right",
        name: "checkbox",
        options: {},
        label: {},
    },

    render: (args) => {
        return <CheckboxComponent {...args} />;
    },
};

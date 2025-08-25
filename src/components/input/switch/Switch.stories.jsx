import { WithRHF } from "@stories/decorators";

import { Switch as SwitchComponent } from "./Switch";

export default {
    argTypes: {
        position: {
            control: { type: "radio" },
            options: ["left", "right"],
        },
    },
    title: "Components/Inputs/Switch",
    element: SwitchComponent,
    decorators: [WithRHF],
};

export const Switch = {
    parameters: {
        design: {
            url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?type=design&node-id=1947-23209&t=J2Q1v4ELUBHj9ft7-4",
            type: "figma",
        },
    },

    args: {
        children: "Switch",
        position: "right",
        name: "switch",
        options: {},
        label: {},
    },

    render: (args) => {
        return <SwitchComponent {...args} />;
    },
};

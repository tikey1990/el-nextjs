import Icon from "@icons/btn/icon-btn-trash.svg";

import { Button as ButtonWithIconComponent } from "./Button";

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
  title: "Components/Buttons/ButtonWithIcon",
  component: ButtonWithIconComponent,
};

export const ButtonWithIcon = {
  args: {
    children: (
      <>
        <Icon />
        Кнопка
      </>
    ),
    variant: "primary",
    disabled: false,
    size: "large",
    props: {},
  },

  parameters: {
    design: {
      url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1699-36929&t=rCJ4z6M52d0pWoWY-4",
      type: "figma",
    },
  },

  render: (args) => <ButtonWithIconComponent {...args} />,
};

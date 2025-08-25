import ParticlesComponent from "./Particles";

export default {
  component: ParticlesComponent,
  title: "Components/Particles",
};

// Компонент звездного неба
export const Particles = {
  parameters: {
    design: {
      url: "https://www.figma.com/file/lUGh2D4V5PFb9oWScNjw4o/EasyLiker?node-id=1699-21401&t=MCjlVjCI7rcMCCaO-4",
      type: "figma",
    },
    background: { default: "sky" },
  },
  render: () => (
    <>
      <ParticlesComponent />
    </>
  ),
  decorators: [],
};

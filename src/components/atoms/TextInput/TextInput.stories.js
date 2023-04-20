import { storyIconMap } from "../../../tools/storybook.js";
import TextInput from "./TextInput.js";

const metadata = {
  argTypes: {
    icon: { control: { options: Object.keys(storyIconMap), type: "select" } },
  },
  component: TextInput,
};

export default metadata;

const Template = ({ width, iconBefore, iconAfter, ...args }) => {
  const IconBefore = storyIconMap[iconBefore];
  const IconAfter = storyIconMap[iconAfter];
  return (
    <TextInput
      iconBefore={IconBefore ? <IconBefore /> : null}
      iconAfter={IconAfter ? <IconAfter /> : null}
      style={{ width }}
      {...args}
    />
  );
};

export const Basic = {
  args: {
    placeholder: "Enter your text",
    width: 240,
  },
  parameters: {
    jest: ["TextInput.test.js"],
  },
  render: (args) => <Template {...args} />,
};

export const Outlined = {
  args: {
    ...Basic.args,
    variant: "outlined",
  },
  render: (args) => <Template {...args} />,
};

export const Dashed = {
  args: {
    ...Basic.args,
    variant: "dashed",
  },
  render: (args) => <Template {...args} />,
};

export const Borderless = {
  args: {
    ...Basic.args,
    variant: "borderless",
  },
  render: (args) => <Template {...args} />,
};

export const withIcon = {
  args: {
    ...Basic.args,
    iconAfter: "AiOutlineEye",
    iconBefore: "AiOutlineSearch",
  },
  render: (args) => <Template {...args} />,
};

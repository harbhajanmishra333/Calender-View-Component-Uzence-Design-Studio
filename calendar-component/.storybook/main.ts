import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: [
    "../src/**/*.stories.@(ts|tsx)"
  ],
  addons: [
    '@storybook/addon-essentials'
  ],
  docs: {
    autodocs: true
  }
};

export default config;

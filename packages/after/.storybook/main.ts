import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async config => {
    if (config.build) {
      delete config.build.rollupOptions;
    }
    if (process.env.STORYBOOK_BASE_PATH) {
      config.base = process.env.STORYBOOK_BASE_PATH;
    }
    return config;
  },
};
export default config;

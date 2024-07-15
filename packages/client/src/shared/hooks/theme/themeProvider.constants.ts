import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const themeTokens = {
  light: {
    algorithm: defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      colorBgBase: '#ffffff',
      colorTextBase: '#000000',
    },
  },
  dark: {
    algorithm: darkAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      colorBgBase: '#000000',
      colorTextBase: '#ffffff',
    },
  },
};
export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

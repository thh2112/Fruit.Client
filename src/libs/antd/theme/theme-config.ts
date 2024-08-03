import { theme, type ThemeConfig } from 'antd';
import { type MapToken, type SeedToken } from 'antd/es/theme/interface';

const customDarkAlgorithm = (seedToken: SeedToken, mapToken: MapToken | undefined) => {
  const mergeToken = theme.darkAlgorithm(seedToken, mapToken);
  const darkToken: MapToken = {
    ...mergeToken,
  };
  return darkToken;
};

export const darkThemeConfig: ThemeConfig = {
  algorithm: customDarkAlgorithm,
  components: {
    Input: {
      activeShadow: '0px 0px 0px 2px rgba(250, 204, 21, 0.10)',
      inputFontSizeLG: 14,
      paddingBlockLG: 8.5,
    },
    InputNumber: {
      activeShadow: '0px 0px 0px 2px rgba(250, 204, 21, 0.10)',
      inputFontSizeLG: 14,
      paddingBlockLG: 8.5,
    },
    Button: {
      primaryShadow: '0px 2px 0px 0px rgba(250, 204, 21, 0.10)',
      colorTextLightSolid: 'rgba(0, 0, 0, 0.65)',
      primaryColor: 'rgba(0, 0, 0, 0.65)',
      fontWeight: 600,
      contentFontSizeLG: 14,
      contentLineHeightLG: 1,
    },
    Menu: {
      itemMarginBlock: 8,
      itemMarginInline: 0,
      itemSelectedBg: '#FEFCE8',
      itemHoverBg: '#FEFCE8',
    },
    Form: {
      labelFontSize: 14,
      fontSize: 12,
    },
    Select: {
      controlOutline: 'transparent',
      fontSizeLG: 14,
    },
    DatePicker: {
      activeShadow: '0px 0px 0px 2px rgba(250, 204, 21, 0.10)',
      fontSizeLG: 14,
      lineHeightLG: 1.71,
    },
    Upload: {
      colorText: '#FACC15',
    },
    Breadcrumb: {
      colorBgTextHover: 'transparent',
      fontWeightStrong: 500,
      fontSize: 20,
      linkColor: 'rgba(0, 0, 0, 0.88)',
      lineHeight: 1.1,
    },
  },
};

export const lightThemeConfig: ThemeConfig = {
  components: {
    Layout: { colorBgLayout: '#fff' },
    Input: {
      activeShadow: '0px 0px 0px 2px rgba(250, 204, 21, 0.10)',
      inputFontSizeLG: 14,
      paddingBlockLG: 8.5,
    },
    InputNumber: {
      activeShadow: '0px 0px 0px 2px rgba(250, 204, 21, 0.10)',
      inputFontSizeLG: 14,
      paddingBlockLG: 8.5,
    },
    Button: {
      primaryShadow: '0px 2px 0px 0px rgba(250, 204, 21, 0.10)',
      colorTextLightSolid: 'rgba(0, 0, 0, 0.65)',
      primaryColor: 'rgba(0, 0, 0, 0.65)',
      fontWeight: 600,
      contentFontSizeLG: 14,
      contentLineHeightLG: 1,
    },
    Menu: {
      itemMarginBlock: 8,
      itemMarginInline: 0,
      itemSelectedBg: '#FEFCE8',
      itemHoverBg: '#FEFCE8',
      subMenuItemBg: '#fff',
    },
    Form: {
      labelFontSize: 14,
      fontSize: 12,
    },
    Select: {
      controlOutline: 'transparent',
      fontSizeLG: 14,
    },
    DatePicker: {
      activeShadow: '0px 0px 0px 2px rgba(250, 204, 21, 0.10)',
      fontSizeLG: 14,
      lineHeightLG: 1.71,
    },
    Upload: {
      colorText: '#FACC15',
    },
    Breadcrumb: {
      colorBgTextHover: 'transparent',
      fontWeightStrong: 500,
      fontSize: 20,
      linkColor: 'rgba(0, 0, 0, 0.88)',
      lineHeight: 1.1,
    },
  },
};

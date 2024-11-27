import { WIDTH_INDICATOR_TAB } from '@/constanst/consts';
import { type ConfigProviderProps, theme, type ThemeConfig } from 'antd';
import { type MapToken, type SeedToken } from 'antd/es/theme/interface';

const { colorBgContainer: colorBgDarkContainer } = theme.getDesignToken({
  algorithm: theme.darkAlgorithm,
});
const { colorBgContainer } = theme.getDesignToken({
  algorithm: theme.defaultAlgorithm,
});

const customDarkAlgorithm = (seedToken: SeedToken, mapToken: MapToken | undefined) => {
  const mergeToken = theme.darkAlgorithm(seedToken, mapToken);

  const darkToken: MapToken = {
    ...mergeToken,
    colorPrimary: seedToken.colorPrimary,
    colorLink: seedToken.colorPrimary,
  };
  return darkToken;
};

export const darkThemeConfig: ThemeConfig = {
  algorithm: customDarkAlgorithm,
  token: {
    colorPrimaryText: '#875F00',
  },
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
      colorTextLightSolid: 'rgba(255, 255, 255, 0.85)',
      primaryColor: 'rgba(255, 255, 255, 0.85)',
      fontWeight: 600,
      contentFontSizeLG: 14,
      contentLineHeightLG: 1,
    },
    Menu: {
      itemMarginBlock: 8,
      itemMarginInline: 0,
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
    Layout: {
      headerBg: colorBgDarkContainer,
      bodyBg: colorBgDarkContainer,
      siderBg: colorBgDarkContainer,
    },
  },
};

export const lightThemeConfig: ThemeConfig = {
  token: {
    colorPrimaryText: '#875F00',
  },
  components: {
    Layout: {
      colorBgLayout: '#fff',
      headerBg: colorBgContainer,
      bodyBg: colorBgContainer,
      siderBg: colorBgContainer,
    },
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
  },
};

export const configProviderProps: ConfigProviderProps = {
  button: {
    style: {
      minWidth: '96px',
    },
  },
  tabs: {
    indicator: { size: () => WIDTH_INDICATOR_TAB },
    className: 'tabs-customize',
  },
};

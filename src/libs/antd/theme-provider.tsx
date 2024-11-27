/* eslint-disable @emotion/syntax-preference */
'use client';
import { Languages, LIGHT_THEME } from '@/constanst/consts';
import { css, Global, ThemeProvider } from '@emotion/react';
import { ConfigProvider, theme, type GlobalToken, type ThemeConfig } from 'antd';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import React, { useMemo } from 'react';
import { configProviderProps, darkThemeConfig, lightThemeConfig } from './theme-config';
import lightTheme from '@/libs/antd/light.json';
import darkTheme from '@/libs/antd/dark.json';
import useLanguage from '@/shared/hooks/useLanguage';

export type ExtendsToken = {
  gray1?: string;
  gray2?: string;
  gray3?: string;
  gray4?: string;
  gray5?: string;
  gray6?: string;
  gray7?: string;
  gray8?: string;
  gray9?: string;

  sizeXXXS?: number;
};

export type IAntdToken = GlobalToken & ExtendsToken;

export interface IThemeAntd {
  antdToken?: IAntdToken;
}

const ThemeProviderAntd = ({ children }: React.PropsWithChildren) => {
  const { token } = theme.useToken();

  return <ThemeProvider theme={{ antdToken: token }}>{children}</ThemeProvider>;
};

const ConfigProviderAntd = ({ children }: React.PropsWithChildren) => {
  const themeMode = 'Light';
  const { language } = useLanguage();
  const themeConfig = themeMode === LIGHT_THEME ? lightThemeConfig : darkThemeConfig;
  const themeJson = themeMode === LIGHT_THEME ? lightTheme : darkTheme;

  const locale = useMemo(() => {
    switch (language) {
      case Languages.EN:
        return enUS;
      case Languages.VI:
        return viVN;
      default:
        return enUS;
    }
  }, [language]);

  const globalStyles = useMemo(
    () => css`
      *::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: ${themeJson.token.gray2};
      }
      *::-webkit-scrollbar-thumb {
        background-color: ${themeJson.token.gray4};
        border-radius: 50px;
      }
    `,
    [themeMode],
  );

  return (
    <>
      {/* <Global styles={globalStyles} /> */}
      <ConfigProvider theme={{ ...themeJson } as ThemeConfig} locale={locale}>
        <ConfigProvider theme={themeConfig} {...configProviderProps}>
          <ThemeProviderAntd>{children}</ThemeProviderAntd>
        </ConfigProvider>
      </ConfigProvider>
    </>
  );
};

export default ConfigProviderAntd;

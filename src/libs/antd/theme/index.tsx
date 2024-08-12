'use client';
import { Global, ThemeProvider, css } from '@emotion/react';
import { ConfigProvider, type GlobalToken, theme, type ThemeConfig } from 'antd';
import React, { useMemo } from 'react';
import darkTheme from '@/libs/antd/theme/dark.json';
import lightTheme from '@/libs/antd/theme/light.json';
import { darkThemeConfig, lightThemeConfig } from '@/libs/antd/theme/theme-config';

export interface IThemeAntd {
  antdToken?: GlobalToken;
}

const ThemeProviderAntd = ({ children }: React.PropsWithChildren) => {
  const { token } = theme.useToken();
  return <ThemeProvider theme={{ antdToken: token }}>{children}</ThemeProvider>;
};

const ConfigProviderAntd = ({ children }: React.PropsWithChildren) => {
  const isThemeLight = true;
  const themeConfig = isThemeLight ? lightThemeConfig : darkThemeConfig;
  const themeJson = isThemeLight ? lightTheme : darkTheme;

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
    [themeConfig],
  );

  return (
    <>
      <Global styles={{ ...globalStyles }} />
      <ConfigProvider theme={{ ...themeJson } as ThemeConfig}>
        <ConfigProvider theme={themeConfig}>
          <ThemeProviderAntd>{children}</ThemeProviderAntd>
        </ConfigProvider>
      </ConfigProvider>
    </>
  );
};

export default function withTheme(children: React.ReactNode) {
  return <ConfigProviderAntd>{children}</ConfigProviderAntd>;
}

/* eslint-disable @emotion/syntax-preference */
'use client';
import { ConfigProvider, theme } from 'antd';
import _get from 'lodash/get';
import { PropsWithChildren } from 'react';

const CustomStyleConfigProvider = ({ children }: PropsWithChildren) => {
  const {
    token: { Tabs, Button },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemSelectedColor: _get(Tabs, 'itemSelectedColor'),
            itemActiveColor: _get(Tabs, 'itemSelectedColor'),
            itemHoverColor: _get(Tabs, 'itemSelectedColor'),
          },
          Button: {
            defaultHoverBorderColor: _get(Button, 'defaultBorderColor'),
            defaultActiveBorderColor: _get(Button, 'defaultBorderColor'),
            defaultHoverColor: _get(Button, 'defaultHoverColor'),
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default CustomStyleConfigProvider;

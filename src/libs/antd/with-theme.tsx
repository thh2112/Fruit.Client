import React from 'react';
import ConfigProviderAntd from './theme-provider';

export default function withTheme(children: JSX.Element) {
  return <ConfigProviderAntd>{children}</ConfigProviderAntd>;
}

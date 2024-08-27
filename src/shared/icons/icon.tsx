'use client';

import React, { useRef } from 'react';

interface IconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {}

const Icon = ({ children, ...rest }: IconProps) => {
  const iconRef = useRef<HTMLSpanElement | null>(null);
  if (!React.isValidElement(children)) {
    return null;
  }

  return (
    <span {...rest} ref={iconRef} className="anticon">
      {children}
    </span>
  );
};

export default Icon;

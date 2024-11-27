import styled from '@emotion/styled';
export const HEIGHT_HEADER = 64;

const MainHeaderContainer = styled.div({
  background: '#ffffff',
  height: HEIGHT_HEADER,
  position: 'sticky',
  left: 0,
  right: 0,
  top: 0,
  boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.03)`,
});

export { MainHeaderContainer };

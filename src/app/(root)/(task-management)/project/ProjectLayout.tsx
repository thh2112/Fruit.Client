'use client';

import { IThemeAntd } from '@/libs/antd/theme';
import styled from '@emotion/styled';
import { Flex, Typography } from 'antd';
import React, { PropsWithChildren } from 'react';

const { Title } = Typography;
function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <ProjectContainer>
      <Title level={4}>Project</Title>
      {children}
    </ProjectContainer>
  );
}

const ProjectContainer = styled(Flex)((props) => ({
  gap: (props.theme as IThemeAntd).antdToken?.paddingLG,
  flexDirection: 'column',
}));

export default ProjectLayout;

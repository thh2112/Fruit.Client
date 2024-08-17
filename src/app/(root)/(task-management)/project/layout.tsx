import { PropsWithChildren } from 'react';
import ProjectLayout from './ProjectLayout';

function layout({ children }: PropsWithChildren) {
  return <ProjectLayout>{children}</ProjectLayout>;
}

export default layout;

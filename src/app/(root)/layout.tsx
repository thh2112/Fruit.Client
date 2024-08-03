import MainLayout from '@/app/_layouts/MainLayout';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}

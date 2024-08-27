import { AuthenticateLayout } from '@/app/_layouts/AuthenticateLayout';

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return <AuthenticateLayout>{children}</AuthenticateLayout>;
}

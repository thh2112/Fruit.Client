import { routeSetting } from '@/routes';
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect(routeSetting.project());
}

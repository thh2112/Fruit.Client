import { routeSetting } from '@/routes/navigate';
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect(routeSetting.project());
}

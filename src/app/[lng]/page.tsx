import { clientSetting } from '@/routes';
import { redirect } from 'next/navigation';

export default async function page() {
  redirect(clientSetting.homePage());
}

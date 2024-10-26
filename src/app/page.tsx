import { routeSetting } from '@/routes/navigate';
import { redirect } from 'next/navigation';

const page = () => {
  return redirect(routeSetting.project());
};

export default page;

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DATE_SHOW_FORMAT } from '@/shared/constant';

dayjs.extend(utc);

interface FormatDateOption {
  format: string;
  keepLocalTime: boolean;
}
export function formatDateWithTimezoneClient(date: Date | string, option?: Partial<FormatDateOption>) {
  const _option = { format: DATE_SHOW_FORMAT, ...option };
  return dayjs(date).utc(!!option?.keepLocalTime).format(_option.format);
}

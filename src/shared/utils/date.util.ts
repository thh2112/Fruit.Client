import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constanst/consts';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

interface FormatDateOptions {
  format?: string;
  keepLocalTime?: boolean;
}
export const formatDateTime = (date: string | Date, options?: FormatDateOptions): string => {
  const _options = { format: DATE_TIME_FORMAT, ...options };
  return dayjs(date).utc(!!_options.keepLocalTime).format(_options.format);
};

export const formatTime = (date: string | Date, options?: FormatDateOptions): string => {
  const _options = { format: TIME_FORMAT, ...options };
  return dayjs(date).utc(!!_options.keepLocalTime).format(_options.format);
};

export const formatDateWithTimezoneClient = (date: string | Date, options?: FormatDateOptions): string => {
  const _options = { format: DATE_TIME_FORMAT, keepLocalTime: true, ...options };
  return formatDateTime(date, { ..._options });
};

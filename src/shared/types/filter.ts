import { KeySearchParamsEnum } from '@/shared/enums';

export type KeySearchParamsType = KeySearchParamsEnum;

export interface DataParamFilter {
  key: KeySearchParamsType;
  value: string | null;
}

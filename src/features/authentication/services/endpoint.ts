import { ENV } from '@/environment';
import { ApiVersion } from '@/shared/types/api-response';

export const endpoint = {
  login: ({ version }: ApiVersion) => `/api/v${version}/auth/login`,
  register: ({ version }: ApiVersion) => `api/v${version}/auth/register`,
};

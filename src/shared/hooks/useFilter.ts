import _forEach from 'lodash/forEach';
import _isArray from 'lodash/isArray';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataParamFilter, KeySearchParamsType } from '@/shared/types/filter';

const useFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSetFilter = (dataParams: DataParamFilter[]) => {
    if (!_isArray(dataParams)) {
      throw new Error('Invalid filter params format');
    }

    const params = new URLSearchParams(searchParams);
    _forEach(dataParams, (param: DataParamFilter) => {
      if (!param.value) {
        return params.delete(param.key);
      }
      params.set(param.key, param.value);
    });

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getValueFilter = (keySearchParam: KeySearchParamsType) => {
    return searchParams.get(keySearchParam);
  };

  return { handleSetFilter, getValueFilter };
};

export default useFilter;

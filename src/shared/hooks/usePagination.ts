import { theme } from 'antd';
import { type PaginationConfig } from 'antd/es/pagination';
import _toNumber from 'lodash/toNumber';
import _toString from 'lodash/toString';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { KeySearchParamsEnum } from '@/shared/enums';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

const usePagination = (): PaginationConfig => {
  const {
    token: { screenSM },
  } = theme.useToken();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isMobileDevice = useMediaQuery(`only screen and (max-width : ${screenSM}px)`);

  const currentPage = _toNumber(searchParams.get(KeySearchParamsEnum.PAGE_NUMBER) || 1);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(KeySearchParamsEnum.PAGE_NUMBER, _toString(page));
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    simple: isMobileDevice ? true : false,
    onChange: handleChangePage,
    current: currentPage,
    hideOnSinglePage: true,
    showSizeChanger: false,
  };
};

export default usePagination;

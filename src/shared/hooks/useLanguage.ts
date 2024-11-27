import { DEFAULT_LANGUAGE } from '@/constanst/consts';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useLanguage = () => {
  const { lng } = useParams();

  const language = useMemo(() => {
    return lng || DEFAULT_LANGUAGE;
  }, [lng]);

  return {
    language: language as any,
  };
};

export default useLanguage;

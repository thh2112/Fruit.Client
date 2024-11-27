import { Select, theme } from 'antd';
import { ChevronDown } from 'lucide-react';
import useLanguage from '@/shared/hooks/useLanguage';
import { useMemo } from 'react';
import { languageSwitcher } from '@/shared/helpers/language-switcher';
import { Languages } from '@/constanst/consts';

const MultiLanguage = () => {
  const {
    token: { colorText },
  } = theme.useToken();

  const { language } = useLanguage();
  const languageOptions = useMemo(
    () => [
      { value: Languages.EN, label: 'EN' },
      { value: Languages.VI, label: 'VI' },
    ],
    [language],
  );

  return (
    <Select
      variant="borderless"
      defaultValue={language}
      style={{ width: 65 }}
      dropdownStyle={{ minWidth: 'fit-content' }}
      suffixIcon={<ChevronDown size={18} color={colorText} />}
      options={languageOptions}
      onChange={languageSwitcher}
    />
  );
};

export default MultiLanguage;

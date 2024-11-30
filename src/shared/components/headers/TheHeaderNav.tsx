import { clientSetting } from '@/routes';
import { NavContainer, NavItem, TextStyled } from '@/shared/styled-components/nav/nav-header';
import { IHeaderNav } from '@/shared/types/nav';
import _find from 'lodash/find';
import _last from 'lodash/last';
import _map from 'lodash/map';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const HeaderNav = () => {
  const pathname = usePathname();
  const currentPath = _last(pathname.split('/'));
  const nav: IHeaderNav[] = useMemo(
    () => [
      {
        key: '1',
        label: 'Home',
        link: clientSetting.homePage(),
      },
      {
        key: '2',
        label: 'About',
        link: clientSetting.about(),
      },
      {
        key: '3',
        label: 'Product',
        link: clientSetting.product(),
      },
      {
        key: '4',
        label: 'New',
        link: clientSetting.new(),
      },
      {
        key: '5',
        label: 'Contact',
        link: clientSetting.contact(),
      },
    ],
    [],
  );

  const [selectedTab, setSelectedTab] = useState<IHeaderNav | null>(nav[0]);

  useEffect(() => {
    const foundNav = _find(nav, { link: currentPath });

    if (!foundNav) {
      setSelectedTab(nav[0]);
      return;
    }
    setSelectedTab(foundNav);
  }, [currentPath]);

  return (
    <NavContainer>
      {_map(nav, (item) => {
        return (
          <NavItem href={item.link}>
            <TextStyled isSelected={item.link === selectedTab?.link}>{item.label}</TextStyled>
          </NavItem>
        );
      })}
    </NavContainer>
  );
};

export default HeaderNav;

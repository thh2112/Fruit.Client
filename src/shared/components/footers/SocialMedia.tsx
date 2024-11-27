import { socialMediaLink } from '@/constanst/consts/social-media';
import { useMediaQuery } from '@/shared/hooks';
import { Flex, List, Typography, theme } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Linkedin, Facebook, Instagram } from 'lucide-react';
import { LinkFooter } from '@/shared/styled-components/footers/main-footer';

interface ISocialMedia {
  icon: React.ReactNode;
  link: string;
  name: string;
}
const SocialMedia = () => {
  const socialMedia: ISocialMedia[] = [
    {
      icon: <Facebook />,
      link: socialMediaLink.facebook,
      name: 'Facebook',
    },
    {
      icon: <Linkedin />,
      link: socialMediaLink.linkedin,
      name: 'Linkedin',
    },
    {
      icon: <Instagram />,
      link: socialMediaLink.instagram,
      name: 'Instagram',
    },
  ];
  return (
    <List
      grid={{ gutter: 16 }}
      dataSource={socialMedia}
      renderItem={(item) => (
        <List.Item style={{ margin: 0 }}>
          <LinkFooter href={item.link} target="_blank" className="okluoon">
            <Typography.Text>{item.name}</Typography.Text>
          </LinkFooter>
        </List.Item>
      )}
    />
  );
};

export default SocialMedia;

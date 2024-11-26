import { socialMediaLink } from '@/constanst/consts/social-media';
import { Flex, Typography } from 'antd';
import Link from 'next/link';
interface ISocialMedia {
  link: string;
  name: string;
}
const SocialMedia = () => {
  const socialMedia: ISocialMedia[] = [
    {
      link: socialMediaLink.facebook,
      name: 'Facebook',
    },
    {
      link: socialMediaLink.linkedin,
      name: 'Linkedin',
    },
  ];
  return (
    <Flex gap="small">
      {socialMedia.map((item) => (
        <Link href={item.link} target="_blank">
          <Typography.Text>{item.name}</Typography.Text>
        </Link>
      ))}
    </Flex>
  );
};

export default SocialMedia;

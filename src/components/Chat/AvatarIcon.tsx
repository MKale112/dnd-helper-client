import { Wrap, WrapItem } from '@chakra-ui/layout';
import { Avatar, useMediaQuery } from '@chakra-ui/react';
import React, { FC } from 'react';

export interface AvatarIconProps {
  name: string;
  imgUrl?: string;
}

const AvatarIcon: FC<AvatarIconProps> = ({ name, imgUrl = 'https://bit.ly/broken-link' }) => {
  const isMobile = useMediaQuery('max-width: 750px');

  return (
    <Wrap>
      <WrapItem>
        <Avatar name={name} src={imgUrl} size={isMobile ? 'sm' : 'md'} />
      </WrapItem>
    </Wrap>
  );
};

export default AvatarIcon;

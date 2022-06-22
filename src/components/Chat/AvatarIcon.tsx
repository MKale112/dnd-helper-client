import { Wrap, WrapItem } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import React, { FC } from 'react';

export interface AvatarIconProps {
  name: string;
  imgUrl?: string;
}

const AvatarIcon: FC<AvatarIconProps> = ({ name, imgUrl }) => {
  const fallbackImg = 'https://bit.ly/broken-link';
  return (
    <Wrap>
      <WrapItem>
        <Avatar name={name} src={imgUrl ? imgUrl : fallbackImg} size='md' />
      </WrapItem>
    </Wrap>
  );
};

export default AvatarIcon;

/* eslint-disable no-underscore-dangle */
import { Center, Heading, useMediaQuery } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useAppSelector } from '../state/hooks';
import Characters from '../components/dashboard/Characters';

import { TUser } from '../types/types';

import { userGreeting } from '../utils/misc';
import Campaigns from '../components/dashboard/Campaigns';

export interface BannerProps {
  isMobile: boolean;
  name?: string;
}

const WelcomeBanner: FC<BannerProps> = ({ isMobile, name = '' }) => {
  const greeting = userGreeting(name);

  return (
    <Center height={{ base: '75px', md: '100px', xl: '150px' }} bg='secondary'>
      <Heading color='white' fontSize={{ base: 'lg', md: 'xl', xl: '4xl' }}>
        {greeting}
      </Heading>
    </Center>
  );
};

const Dashboard: FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 750px)');
  const { user } = useAppSelector((state) => state.auth) || ({} as TUser);

  return (
    <>
      <WelcomeBanner isMobile={isMobile} name={user.name} />
      <Characters isMobile={isMobile} playerName={user.name} />
      <Campaigns isMobile={isMobile} />
    </>
  );
};

export default Dashboard;

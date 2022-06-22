import { Box, Center, Flex } from '@chakra-ui/layout';
import React, { FC } from 'react';
import LoginComponent from '../components/authentication/Login';
import bgImage from '../assets/images/general-bg-2.webp';

const Login: FC = () => {
  console.log('Login Page');
  return (
    <Flex justify='flex-end' bgImage={bgImage} bgSize='cover' height='85vh'>
      <Center width='50%' bgColor='special' height='100%' boxShadow='-30px 0px 30px -10px'>
        <LoginComponent />
      </Center>
    </Flex>
  );
};

export default Login;

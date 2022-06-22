import { Box, Center } from '@chakra-ui/layout';
import React, { FC } from 'react';
import RegisterComponent from '../components/authentication/Register';
import bgImage from '../assets/images/general-bg.webp';

const Register: FC = () => {
  console.log('Register Page');
  return (
    <Box bgImage={bgImage} bgSize='cover' height='85vh'>
      <Center width='50%' bgColor='special' height='100%' boxShadow='30px 0px 30px -10px'>
        <RegisterComponent />
      </Center>
    </Box>
  );
};

export default Register;

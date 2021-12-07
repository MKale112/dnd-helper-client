import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';

const ChakraAlert = (msg:string, status:string) => {
  <Alert status="error">
    <AlertIcon />
    <AlertTitle mr={2}>{status.toUpperCase()}</AlertTitle>
    <AlertDescription>{msg}</AlertDescription>
    {/* <CloseButton position='absolute' right='8px' top='8px' /> */}
  </Alert>;
};

export default ChakraAlert;

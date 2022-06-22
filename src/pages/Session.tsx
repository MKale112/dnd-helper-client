import { Box, SimpleGrid } from '@chakra-ui/layout';
import React, { FC } from 'react';
import InputLine from '../components/Chat/InputLine';
import MessageBoard from '../components/Chat/MessageBoard';

const Session: FC = () => {
  console.log('Session in session!');
  return (
    <>
      <SimpleGrid columns={2}>
        <Box>
          <MessageBoard />
          <InputLine />
        </Box>
        <Box>Msg</Box>
      </SimpleGrid>
    </>
  );
};

export default Session;

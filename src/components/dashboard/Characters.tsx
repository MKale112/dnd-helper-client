import React, { FC } from 'react';

import { Container, HStack } from '@chakra-ui/react';
import Character from './Character';

const Characters: FC = () => (
  <Container maxW='5xl' py={12}>
    <HStack spacing='10px'>
      <Character />
      <Character />
      <Character />
    </HStack>
  </Container>
);

export default Characters;

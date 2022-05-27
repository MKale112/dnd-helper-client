import React, { FC } from 'react';
import { Container, HStack } from '@chakra-ui/react';
import Character from './Character';
import { ICharacter } from '../../types/character';

interface ICharacterProps {
  playerName: string;
  characters: ICharacter[];
}

const Characters: FC<ICharacterProps> = ({ characters, playerName }) => {
  const characterCards = characters.map((char) => <Character key={char.id} />);

  return (
    <Container maxW='5xl' py={12}>
      <HStack spacing='10px'>{characterCards}</HStack>
    </Container>
  );
};

export default Characters;

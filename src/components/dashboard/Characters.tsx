import React, { FC } from 'react';
import { Container, HStack } from '@chakra-ui/react';
import Card from '../Card/Card';
import { ICharacter } from '../../types/character';
import { EPurpose } from '../../types/types';

interface ICharacterProps {
  playerName: string;
  characters: ICharacter[];
}

const Characters: FC<ICharacterProps> = ({ characters, playerName }) => {
  const characterCards = characters.map((char) => (
    <Card
      key={char.id}
      purpose={EPurpose.CHARACTER}
      name={char.characterName}
      characterClass={char.characterClass}
      race={char.race}
      status={char.status}
    />
  ));

  return (
    <Container maxW='5xl' py={12}>
      <HStack spacing='10px'>{characterCards}</HStack>
    </Container>
  );
};

export default Characters;

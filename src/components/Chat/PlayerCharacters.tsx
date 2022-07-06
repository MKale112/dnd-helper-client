import { Flex, Center, Heading, Box, SimpleGrid, VStack } from '@chakra-ui/layout';
import { Button, Text, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';
import { CharacterClass, ICharacter } from '../../types/character';
import { statusCharColorMap, classColorMap, capitalizeString, getAttributeBonus } from '../../utils/misc';
import imgUrl from '../../assets/images/fighter_male.jpg';
import { Attributes, Wallet } from '../Modals/CharacterInfoModal';

export interface CharacterPortraitProps {
  character: ICharacter;
}

export const CharacterPortrait: FC<CharacterPortraitProps> = ({ character }) => {
  const bgColor = useColorModeValue('gray.700', 'gray.100');
  const fontColor = useColorModeValue('gray.100', 'gray.700');
  const {
    level,
    proficiencyBonus,
    characterName,
    race,
    gender,
    characterClass,
    hitpointMax,
    weapon,
    armor,
    shield,
    attributes,
    wallet,
    bio,
  } = character || ({} as ICharacter);

  return (
    <Flex
      direction='row'
      border={1}
      height={{ base: '200px', md: '250px', xl: '200px' }}
      width='100%'
      minHeight='250px'
      bgColor={bgColor}
    >
      <Flex direction='column'>
        <Center py={2} bgColor={classColorMap.get(character.characterClass as CharacterClass)}>
          <Heading letterSpacing={5} fontSize={{ base: 'sm', md: 'md', lg: 'xl' }} color='white'>
            {capitalizeString(character.characterName)}
          </Heading>
        </Center>

        <SimpleGrid color={fontColor} p={5} columns={4} spacing={2}>
          <Box>
            <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>General Info:</Heading>
            <Flex direction='column' align='flex-start'>
              <Text>
                <strong>Race</strong>: {capitalizeString(race)}
              </Text>
              <Text>
                <strong>Class</strong>: {capitalizeString(characterClass)}
              </Text>
            </Flex>
          </Box>

          <Box>
            <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>Attributes: </Heading>
            <Attributes attributes={attributes} />
          </Box>

          <Box>
            <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>Combat Info:</Heading>
            <Flex direction='column' align='flex-start'>
              <Text>
                <strong>HP</strong>: {hitpointMax}
              </Text>
              <Text>
                <strong>Speed</strong>: 30 feet
              </Text>
              <Text mr={4}>
                <strong>Prof. Mod</strong>: {proficiencyBonus}
              </Text>
            </Flex>
          </Box>

          <Box>
            <Text mr={4}>
              <strong>Iniciative</strong>: +{getAttributeBonus(attributes.dexterity)}
            </Text>
            <Text>
              <strong>Armor</strong>: {armor ? capitalizeString(armor) : 'No Armor'}
            </Text>
            <Text>
              <strong>Weapon</strong>: {weapon ? capitalizeString(weapon) : 'No Weapon'}
            </Text>
          </Box>
        </SimpleGrid>
        {/* <Wallet wallet={wallet} /> */}
      </Flex>
      <img src={imgUrl} alt="Player's Charactere" />
    </Flex>
  );
};

export interface PlayerCharactersProps {
  characterData: ICharacter[];
}

const PlayerCharacters: FC<PlayerCharactersProps> = ({ characterData }) => {
  const bgColor = useColorModeValue('gray.700', 'gray.100');

  const characterArray = characterData.map((item) => <CharacterPortrait character={item} />);
  return (
    <VStack bgColor={bgColor} spacing={1}>
      {characterArray}
    </VStack>
  );
};

export default PlayerCharacters;

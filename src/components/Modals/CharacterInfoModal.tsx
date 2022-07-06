/* eslint-disable camelcase */
import { Box, Flex, Heading, HStack, SimpleGrid, StackDivider, VStack } from '@chakra-ui/layout';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Button, ModalBody, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { CharacterClass, ICharacter } from '../../types/character';
import { capitalizeString, classColorMap, getAttributeBonus, getAttributeSnippet } from '../../utils/misc';

interface WalletProps {
  wallet: {
    cp: number;
    sp: number;
    gp: number;
  };
}

export const Wallet: FC<WalletProps> = ({ wallet }) => {
  const walletArray = Object.keys(wallet).map((key: any) => (
    <Text key={key} mr={4}>
      <strong>{getAttributeSnippet(key)}</strong>: {wallet[key as keyof typeof wallet]}
    </Text>
  ));
  return <Flex justify='space-between'>{walletArray}</Flex>;
};

interface AttributesProps {
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}

export const Attributes: FC<AttributesProps> = ({ attributes }) => {
  const attributeArray = Object.keys(attributes).map((key: any) => (
    <Text key={key} mr={4}>
      <strong>{getAttributeSnippet(key)}</strong>: {attributes[key as keyof typeof attributes]}
    </Text>
  ));
  return <SimpleGrid columns={2}>{attributeArray}</SimpleGrid>;
};

export interface CharacterInfoModalProps {
  isOpen: boolean;
  info: ICharacter | null;
  onClose: () => void;
}

const CharacterInfoModal: FC<CharacterInfoModalProps> = ({ isOpen, info, onClose }) => {
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
  } = info || ({} as ICharacter);
  console.log('PB', proficiencyBonus);
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bgColor={classColorMap.get(characterClass as CharacterClass)} pb={5} borderTopRadius={5} mb={5}>
          <Flex flexDirection='row' justifyContent='space-between'>
            <Heading color='white' fontSize={{ base: 'xl', md: '2xl' }}>
              {capitalizeString(characterName)}
            </Heading>
            <Heading color='white' fontSize={{ base: 'xl', md: '2xl' }}>
              Level: {level}
            </Heading>
          </Flex>
        </ModalHeader>
        <ModalBody as={VStack} divider={<StackDivider borderColor='gray.200' />} spacing={5} alignItems='flex-start'>
          <SimpleGrid columns={2} spacing={{ base: 10, md: 20 }}>
            <Box>
              <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>General Info:</Heading>
              <Flex direction='column' align='flex-start'>
                <Text>Race: {capitalizeString(race)}</Text>
                {gender && <Text>Gender: {capitalizeString(gender)}</Text>}
                <Text>Class: {capitalizeString(characterClass)}</Text>
              </Flex>
            </Box>
            <Box>
              <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>Attributes: </Heading>
              <Attributes attributes={attributes} />
            </Box>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={{ base: 10, md: 20 }}>
            <Box>
              <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>Combat Info:</Heading>
              <Flex direction='column' align='flex-start'>
                <Text>
                  <strong>Maximum HP</strong>: {hitpointMax}
                </Text>
                <Text>
                  <strong>Speed</strong>: 30 feet
                </Text>
                <Text mr={4}>
                  <strong>Prof. Modifier</strong>: {proficiencyBonus}
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
          <Wallet wallet={wallet} />
          <Box>
            <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>Bio:</Heading>
            <Text noOfLines={3}>{bio}</Text>
          </Box>
        </ModalBody>
        <ModalFooter as={HStack}>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CharacterInfoModal;

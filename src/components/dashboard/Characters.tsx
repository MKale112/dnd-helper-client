import React, { FC, useState } from 'react';
import { Button, Divider, Flex, Heading, HStack, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import Card, { CharacterInfo } from '../Card/Card';
import { CharacterStatus, ICharacter } from '../../types/character';
import imgSrc from '../../assets/images/fighter_male.jpg';
import CardSlider from '../CardSlider/CardSlider';
import DeleteCharacterModal from '../character/DeleteCharacterModal';

interface ICharacterProps {
  isMobile: boolean;
  playerName: string;
  characters: ICharacter[];
}

const Characters: FC<ICharacterProps> = ({ isMobile, characters, playerName }) => {
  const {
    isOpen: isCharacterUpdateModalOpen,
    onOpen: setIsCharacterUpdateModalOpen,
    onClose: closeCharacterUpdateModal,
  } = useDisclosure();
  const {
    isOpen: isCharacterDeleteModalOpen,
    onOpen: setIsCharacterDeleteModalOpen,
    onClose: closeCharacterDeleteModal,
  } = useDisclosure();
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null);
  console.log(selectedCharacter);

  const characterCards = characters.map((char) => (
    <Card<CharacterStatus>
      key={char._id}
      id={char._id}
      name={char.characterName}
      status={char.status}
      imgUrl={imgSrc}
      item={char}
      selectedItem={selectedCharacter}
      setItem={(item) => setSelectedCharacter(item)}
    >
      <CharacterInfo gender={char.gender} race={char.race} level={char.level} characterClass={char.characterClass} />
    </Card>
  ));

  return (
    <Flex direction='column' px={{ base: 4, md: 16, xl: 40 }} py={10}>
      <Heading fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} pb={5}>
        {isMobile ? 'Characters' : 'Check Out Your Characters!'}
      </Heading>
      <Flex direction='row' pb={5}>
        {selectedCharacter && (
          <HStack>
            <Button onClick={() => setIsCharacterUpdateModalOpen()}>Update</Button>
            <Button onClick={() => setIsCharacterDeleteModalOpen()}>Delete</Button>
          </HStack>
        )}
      </Flex>
      <Divider />
      <CardSlider cards={characterCards} />
      {isCharacterUpdateModalOpen && (
        // <CreateCharacterModal
        //   isOpen={isCreateCharacterModalOpen}
        //   submitCharacter={(values: FormikValues) => submitCharacter(values)}
        //   updateRequest={updateRequest}
        //   onClose={() => setIsCreateCharacterModalOpen(false)}
        // />
        <></>
      )}

      {isCharacterDeleteModalOpen && (
        <DeleteCharacterModal
          isCharacterDeleteModalOpen={isCharacterDeleteModalOpen}
          closeCharacterDeleteModal={closeCharacterDeleteModal}
        />
      )}
    </Flex>
  );
};

export default Characters;

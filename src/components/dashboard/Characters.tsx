import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Spinner,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import axios from 'axios';
import { FormikValues } from 'formik';
import { bindActionCreators } from 'redux';
import { CharacterActionCreators } from '../../state';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { TUser } from '../../types/types';
import { CreateCharacterModal } from '../Modals/CreateCharacterModal';
import DeleteCharacterModal from '../Modals/DeleteCharacterModal';
import CardSlider from '../CardSlider/CardSlider';
import { CharacterStatus, ICharacter } from '../../types/character';
import Card, { CharacterInfo } from '../Card/Card';
import imgSrc from '../../assets/images/fighter_male.jpg';
import CharacterInfoModal from '../Modals/CharacterInfoModal';

interface ICharacterProps {
  isMobile: boolean;
  playerName: string;
}

const Characters: FC<ICharacterProps> = ({ isMobile, playerName }) => {
  const {
    isOpen: isCharacterViewModalOpen,
    onOpen: setisCharacterViewModalOpen,
    onClose: closeCharacterViewModal,
  } = useDisclosure();
  const {
    isOpen: isCharacterCreateModalOpen,
    onOpen: setIsCharacterCreateModalOpen,
    onClose: closeCharacterCreateModal,
  } = useDisclosure();
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
  const [characterData, setCharacterData] = useState([] as ICharacter[]);
  const [isLoadingChars, setIsLoadingChars] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(null);

  console.log('selected: ', selectedCharacter);

  const { user } = useAppSelector((state) => state.auth) || ({} as TUser);

  const fetchCharacters = async (): Promise<void> => {
    try {
      const response = await axios.get('/api/characters');
      const characters = response.data as ICharacter[];
      setCharacterData(characters);
      console.log(characters);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoadingChars(true);
    // dispatch loadUsers
    fetchCharacters();
    // dispatch loadCampaigns
    // loadCampaigns();
    setIsLoadingChars(false);
  }, []);

  const dispatch = useAppDispatch();
  const { createCharacter } = bindActionCreators(CharacterActionCreators, dispatch);

  const submitCharacter = (values: FormikValues): void => {
    console.log('Submitted: ', values);
    createCharacter(values, user?._id as string);
    closeCharacterCreateModal();
    fetchCharacters();
  };

  const updateCharacter = async (values: FormikValues): Promise<void> => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { characterName, race, characterClass, gender, level, attributes, weapon, armor, shield, bio, wallet } =
      values;
    const body = JSON.stringify({
      playerId: user?._id,
      characterName,
      race,
      characterClass,
      gender,
      level,
      attributes,
      weapon,
      armor,
      shield,
      bio,
      wallet,
    });
    const res = await axios.put(`/api/characters/${selectedCharacter?._id}`, body, config);
    setSelectedCharacter(null);
    closeCharacterUpdateModal();
    fetchCharacters();
    console.log(res.data);
  };

  const deleteCharacter = async (): Promise<void> => {
    const res = await axios.delete(`/api/characters/${selectedCharacter?._id}`);
    setSelectedCharacter(null);
    fetchCharacters();
    console.log('deleted & refetched!');
  };

  const characterCards = characterData.map((char) => (
    <Card<CharacterStatus>
      key={char._id}
      id={char._id}
      name={char.characterName}
      status={char.status}
      imgUrl={imgSrc}
      item={char}
      selectedItem={selectedCharacter}
      setItem={(item) => setSelectedCharacter(item)}
      setisCharacterViewModalOpen={setisCharacterViewModalOpen}
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
        <Button variant='forward-btn' mr={5} onClick={() => setIsCharacterCreateModalOpen()}>
          Create a new Character
        </Button>
        {selectedCharacter && (
          <HStack spacing={5}>
            <Button onClick={() => setIsCharacterUpdateModalOpen()}>Update</Button>
            <Button variant='danger-btn' onClick={() => setIsCharacterDeleteModalOpen()}>
              Delete
            </Button>
          </HStack>
        )}
      </Flex>
      <Divider />
      {characterData ? (
        <CardSlider cards={characterCards} />
      ) : (
        <Center color='darkSecondary'>
          <Heading py={20} fontSize={{ base: 'xl', md: 'xl', lg: '3xl' }}>
            Currently you have no CHARACTERS ...
          </Heading>
        </Center>
      )}

      {isCharacterViewModalOpen && (
        <CharacterInfoModal
          isOpen={isCharacterViewModalOpen}
          info={selectedCharacter}
          onClose={closeCharacterViewModal}
        />
      )}
      {isCharacterCreateModalOpen && (
        <CreateCharacterModal
          isOpen={isCharacterCreateModalOpen}
          submitCharacter={(values: FormikValues) => submitCharacter(values)}
          onClose={closeCharacterCreateModal}
        />
      )}
      {isCharacterUpdateModalOpen && (
        <CreateCharacterModal
          updateValues={selectedCharacter}
          isOpen={isCharacterUpdateModalOpen}
          submitCharacter={(values: FormikValues) => updateCharacter(values)}
          onClose={closeCharacterUpdateModal}
        />
      )}
      {isCharacterDeleteModalOpen && (
        <DeleteCharacterModal
          isCharacterDeleteModalOpen={isCharacterDeleteModalOpen}
          closeCharacterDeleteModal={closeCharacterDeleteModal}
          deleteCharacter={deleteCharacter}
        />
      )}
    </Flex>
  );
};

export default Characters;

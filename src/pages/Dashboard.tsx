/* eslint-disable no-underscore-dangle */
import { Button, Center, Heading, Spinner, useMediaQuery } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
// REDUX
import { bindActionCreators } from 'redux';
import { FormikValues } from 'formik';
import { CharacterActionCreators } from '../state';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import Characters from '../components/dashboard/Characters';
import { CreateCharacterModal } from '../components/character/CreateCharacterModal';
import { TUser } from '../types/types';
import { ICharacter } from '../types/character';
import { userGreeting } from '../utils/misc';
import Campaigns from '../components/dashboard/Campaigns';

export interface BannerProps {
  isMobile: boolean;
  name?: string;
}

const WelcomeBanner: FC<BannerProps> = ({ isMobile, name = '' }) => {
  const greeting = userGreeting(name);

  return (
    <Center height={{ base: '75px', md: '100px', xl: '150px' }} bg='secondary'>
      <Heading color='white' fontSize={{ base: 'lg', md: 'xl', xl: '4xl' }}>
        {greeting}
      </Heading>
    </Center>
  );
};

const Dashboard: FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 750px)');

  const [characterData, setCharacterData] = useState([] as ICharacter[]);
  const [isLoadingChars, setIsLoadingChars] = useState(false);
  const [isCreateCharacterModalOpen, setIsCreateCharacterModalOpen] = useState(false);

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

  console.log('characterData: ', characterData);

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
    setIsCreateCharacterModalOpen(false);
  };

  const updateRequest = (): void => {
    console.log('Updated');
  };

  return (
    <>
      <WelcomeBanner isMobile={isMobile} name={user.name} />
      {!isLoadingChars ? (
        <Characters isMobile={isMobile} playerName={user.name} characters={characterData} />
      ) : (
        <Spinner />
      )}
      <Campaigns isMobile={isMobile} />
      <Button onClick={() => setIsCreateCharacterModalOpen(true)}> Make a new Character</Button>
      {/* <Campaigns  /> */}
      {isCreateCharacterModalOpen && (
        <CreateCharacterModal
          isOpen={isCreateCharacterModalOpen}
          submitCharacter={(values: FormikValues) => submitCharacter(values)}
          updateRequest={updateRequest}
          onClose={() => setIsCreateCharacterModalOpen(false)}
        />
      )}
    </>
  );
};

export default Dashboard;

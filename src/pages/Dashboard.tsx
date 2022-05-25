/* eslint-disable no-underscore-dangle */
import { Button } from '@chakra-ui/react';
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

const Dashboard: FC = () => {
  const [characterData, setCharacterData] = useState([] as ICharacter[]);
  const [isCreateCharacterModalOpen, setIsCreateCharacterModalOpen] = useState(false);

  // useEffect(() => {
  //   // dispatch loadUsers
  //   // loadCharacters();
  //   // dispatch loadCampaigns
  //   // loadCampaigns();
  // }, [characterData]);

  const { user } = useAppSelector((state) => state.auth) || ({} as TUser);

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
      {/* <WelcomeBanner />  */}
      <Characters
      // characters={characterData}
      />
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

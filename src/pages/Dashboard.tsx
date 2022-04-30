import { Button } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import Characters from '../components/dashboard/Characters';
import { CreateCharacterModal } from '../components/character/CreateCharacterModal';
import { CharacterCreationInput } from '../types/character';

const Dashboard: FC = () => {
  const [characterData, setCharacterData] = useState({} as CharacterCreationInput);
  const [isCreateCharacterModalOpen, setIsCreateCharacterModalOpen] = useState(false);

  const handleCreateCharacterForm = (): void => {
    setIsCreateCharacterModalOpen(false);
  };

  const handleCloseCreateCharacterForm = (): void => {
    setIsCreateCharacterModalOpen(false);
  };

  const submitCharacter = (): void => {
    console.log('Submitted');
  };

  const updateRequest = (): void => {
    console.log('Updated');
  };

  return (
    <>
      {/* <WelcomeBanner />  */}
      <Characters />
      <Button onClick={() => setIsCreateCharacterModalOpen(true)}> Make a new Character</Button>
      {/* <Campaigns  /> */}
      {isCreateCharacterModalOpen && (
        <CreateCharacterModal
          isOpen={isCreateCharacterModalOpen}
          submitCharacter={submitCharacter}
          updateRequest={updateRequest}
          onClose={handleCloseCreateCharacterForm}
        />
      )}
    </>
  );
};

export default Dashboard;

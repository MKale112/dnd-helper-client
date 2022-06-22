import React, { FC } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Button, Heading, HStack } from '@chakra-ui/react';

export interface DeleteCharacterModalProps {
  isCharacterDeleteModalOpen: boolean;
  closeCharacterDeleteModal: () => void;
  deleteCharacter: () => void;
}

const DeleteCharacterModal: FC<DeleteCharacterModalProps> = ({
  isCharacterDeleteModalOpen,
  closeCharacterDeleteModal,
  deleteCharacter,
}) => (
  <Modal isCentered isOpen={isCharacterDeleteModalOpen} onClose={closeCharacterDeleteModal}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <Heading fontSize={{ base: 'xl', md: '2xl' }}>Do you really want to delete your character?</Heading>
      </ModalHeader>
      <ModalFooter as={HStack}>
        <Button onClick={closeCharacterDeleteModal}>Cancel</Button>
        <Button
          variant='danger-btn'
          onClick={() => {
            deleteCharacter();
            closeCharacterDeleteModal();
          }}
        >
          Yes
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteCharacterModal;

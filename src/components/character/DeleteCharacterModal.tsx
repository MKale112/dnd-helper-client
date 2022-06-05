import React, { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Spinner,
  Center,
  Heading,
  ModalCloseButton,
  HStack,
} from '@chakra-ui/react';

export interface DeleteCharacterModalProps {
  isCharacterDeleteModalOpen: boolean;
  closeCharacterDeleteModal: () => void;
}

const DeleteCharacterModal: FC<DeleteCharacterModalProps> = ({
  isCharacterDeleteModalOpen,
  closeCharacterDeleteModal,
}) => (
  <Modal isCentered isOpen={isCharacterDeleteModalOpen} onClose={closeCharacterDeleteModal}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <Heading>Do you really want to delete your character?</Heading>
      </ModalHeader>
      <ModalFooter as={HStack}>
        {/* <HStack> */}
        <Button onClick={closeCharacterDeleteModal}>Cancel</Button>
        <Button
          variant='danger-btn'
          // onClick={() => deleteItem(item)}
        >
          Yes
        </Button>
        {/* </HStack> */}
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteCharacterModal;

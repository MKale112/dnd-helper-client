import React, { FC } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Button, Heading, HStack } from '@chakra-ui/react';

export interface DeleteCampaignModalProps {
  isCampaignDeleteModalOpen: boolean;
  closeCampaignDeleteModal: () => void;
  deleteCampaign: () => void;
}

const DeleteCampaignModal: FC<DeleteCampaignModalProps> = ({
  isCampaignDeleteModalOpen,
  closeCampaignDeleteModal,
  deleteCampaign,
}) => (
  <Modal isCentered isOpen={isCampaignDeleteModalOpen} onClose={closeCampaignDeleteModal}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <Heading fontSize={{ base: 'xl', md: '2xl' }}>Do you really want to delete this campaign?</Heading>
      </ModalHeader>
      <ModalFooter as={HStack}>
        <Button onClick={closeCampaignDeleteModal}>Cancel</Button>
        <Button
          variant='danger-btn'
          onClick={() => {
            deleteCampaign();
            closeCampaignDeleteModal();
          }}
        >
          Yes
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteCampaignModal;

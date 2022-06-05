import { Flex, Heading, HStack, Divider } from '@chakra-ui/layout';
import { Button, useDisclosure } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { ICampaign } from '../../types/campaign';

export interface CampaignsProps {
  isMobile: boolean;
}

const Campaigns: FC<CampaignsProps> = ({ isMobile }) => {
  const {
    isOpen: isCampaignCreateModalOpen,
    onOpen: setIsCampaignCreateModalOpen,
    onClose: closeCampaignCreateModal,
  } = useDisclosure();
  const {
    isOpen: isCampaignUpdateModalOpen,
    onOpen: setIsCampaignUpdateModalOpen,
    onClose: closeCampaignUpdateModal,
  } = useDisclosure();
  const {
    isOpen: isCampaignDeleteModalOpen,
    onOpen: setIsCampaignDeleteModalOpen,
    onClose: closeCampaignDeleteModal,
  } = useDisclosure();
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign | null>(null);
  console.log('inside <Campaigns />!');
  return (
    <Flex direction='column' px={{ base: 4, md: 16, xl: 40 }} py={10}>
      <Heading fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} pb={5}>
        {isMobile ? 'Campaigns' : 'Here are your campaigns!'}
      </Heading>
      <Flex direction='row' pb={5}>
        <Button onClick={() => console.log('Create campaign')}>Update</Button>
        {true && (
          <HStack>
            <Button onClick={() => console.log('Update campaign')}>Update</Button>
            <Button onClick={() => console.log('Delete campaign')}>Delete</Button>
          </HStack>
        )}
      </Flex>
      <Divider />
      {/* <Campaigns /> */}
      {/* {isCampaignCreateModalOpen && <CreateCampaignModal />} */}
      {/* {isCampaignUpdateModalOpen && <UpdateCampaignModal />} */}
      {/* {isCampaignDeleteModalOpen && <CreateDeleteModal />} */}
    </Flex>
  );
};

export default Campaigns;

import { Flex, Heading, HStack, Divider, Center, SimpleGrid } from '@chakra-ui/layout';
import { Button, useDisclosure } from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { FormikValues } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../state/hooks';
import { CampaignStatus, ICampaign } from '../../types/campaign';
import { TUser } from '../../types/types';
import CampaignCard, { CampaignInfo } from '../Card/CampaignCard';
import { CreateCampaignModal } from '../Modals/CreateCampaignModal';
import DeleteCampaignModal from '../Modals/DeleteCampaignModal';
import imgSrc from '../../assets/images/general-bg-2.webp';
import CampaignInfoModal from '../Modals/CampaignInfoModal';

const config = {
  headers: { 'Content-Type': 'application/json' },
};

export interface CampaignsProps {
  isMobile: boolean;
}

const Campaigns: FC<CampaignsProps> = ({ isMobile }) => {
  const {
    isOpen: isCampaignViewModalOpen,
    onOpen: setisCampaignViewModalOpen,
    onClose: closeCampaignViewModalOpen,
  } = useDisclosure();
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
  const [campaignData, setCampaignData] = useState([] as ICampaign[]);
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(false);

  console.log('selected: ', selectedCampaign);

  const auth = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth) || ({} as TUser);

  const fetchCampaigns = async (): Promise<void> => {
    setIsLoadingCampaigns(true);
    try {
      const response = await axios.get('/api/campaigns');
      const campaigns = response.data as ICampaign[];
      setCampaignData(campaigns);
      console.log(campaigns);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCampaigns(false);
    }
  };

  useEffect(() => {
    if (auth.token) fetchCampaigns();
  }, [auth]);

  const submitCampaign = async (values: FormikValues): Promise<void> => {
    console.log('Submitted: ', values);
    const body = JSON.stringify(values);
    const res = (await axios.post('/api/campaigns', body, config)) as AxiosResponse<ICampaign>;
    closeCampaignCreateModal();
    fetchCampaigns();
  };

  const updateCampaign = async (values: FormikValues): Promise<void> => {
    const body = JSON.stringify(values);
    const res = await axios.put(`/api/campaigns/${selectedCampaign?._id}`, body, config);
    setSelectedCampaign(null);
    closeCampaignUpdateModal();
    fetchCampaigns();
  };

  const deleteCampaign = async (): Promise<void> => {
    const res = await axios.delete(`/api/campaigns/${selectedCampaign?._id}`);
    setSelectedCampaign(null);
    fetchCampaigns();
    console.log('deleted & refetched!');
  };

  const campaignCards = campaignData.map((campaign) => (
    <CampaignCard<CampaignStatus>
      key={campaign._id}
      id={campaign._id}
      name={campaign.campaignName}
      status={campaign.status}
      imgUrl={imgSrc}
      item={campaign}
      selectedItem={selectedCampaign}
      setItem={(item) => setSelectedCampaign(item)}
      setisCampaignViewModalOpen={setisCampaignViewModalOpen}
    >
      <CampaignInfo DMname={campaign.DMname} dateStarted={campaign.dateStarted} dateEnded={campaign.dateEnded} />
    </CampaignCard>
  ));

  return (
    <Flex direction='column' px={{ base: 4, md: 16, xl: 40 }} py={10}>
      <Heading fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} pb={5}>
        {isMobile ? 'Campaigns' : 'Here are your campaigns!'}
      </Heading>
      <Flex direction='row' pb={5}>
        <Button variant='forward-btn' mr={5} onClick={() => setIsCampaignCreateModalOpen()}>
          Create a New Campaign
        </Button>
        {selectedCampaign && (
          <HStack spacing={5}>
            <Button onClick={() => setIsCampaignUpdateModalOpen()}>Update</Button>
            <Button variant='danger-btn' onClick={() => setIsCampaignDeleteModalOpen()}>
              Delete
            </Button>
          </HStack>
        )}
      </Flex>
      <Divider />
      {campaignData.length !== 0 ? (
        <Center>
          <SimpleGrid columns={{ base: 2, md: 3 }}>{campaignCards}</SimpleGrid>
        </Center>
      ) : (
        <Center color='darkSecondary'>
          <Heading py={20} fontSize={{ base: 'xl', md: 'xl', lg: '3xl' }}>
            Currently you have no CAMPAIGNS ...
          </Heading>
        </Center>
      )}

      {isCampaignViewModalOpen && (
        <CampaignInfoModal
          isOpen={isCampaignViewModalOpen}
          info={selectedCampaign}
          onClose={closeCampaignViewModalOpen}
        />
      )}
      {isCampaignCreateModalOpen && (
        <CreateCampaignModal
          isOpen={isCampaignCreateModalOpen}
          submitCampaign={(values: FormikValues) => submitCampaign(values)}
          onClose={closeCampaignCreateModal}
        />
      )}
      {isCampaignUpdateModalOpen && (
        <CreateCampaignModal
          updateValues={selectedCampaign}
          isOpen={isCampaignUpdateModalOpen}
          submitCampaign={(values: FormikValues) => updateCampaign(values)}
          onClose={closeCampaignUpdateModal}
        />
      )}
      {isCampaignDeleteModalOpen && (
        <DeleteCampaignModal
          isCampaignDeleteModalOpen={isCampaignDeleteModalOpen}
          closeCampaignDeleteModal={closeCampaignDeleteModal}
          deleteCampaign={deleteCampaign}
        />
      )}
    </Flex>
  );
};

export default Campaigns;

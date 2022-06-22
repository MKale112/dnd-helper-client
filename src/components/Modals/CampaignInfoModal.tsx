/* eslint-disable camelcase */
import { Box, Flex, Heading, HStack, SimpleGrid, StackDivider, VStack } from '@chakra-ui/layout';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Button, ModalBody, Text } from '@chakra-ui/react';
import Moment from 'react-moment';
import React, { FC } from 'react';
import { CampaignStatus, ICampaign, Player } from '../../types/campaign';
import { capitalizeString, statusCampaignColorMap } from '../../utils/misc';

interface PlayersProps {
  players: Player[];
}

const Players: FC<PlayersProps> = ({ players }) => {
  const playersArray = players.map((item: Player) => (
    <Text key={item.user} mr={4}>
      {item.character}
    </Text>
  ));
  return <VStack>{playersArray}</VStack>;
};

export interface CharacterInfoModalProps {
  isOpen: boolean;
  info: ICampaign | null;
  onClose: () => void;
}

const CharacterInfoModal: FC<CharacterInfoModalProps> = ({ isOpen, info, onClose }) => {
  const { campaignName, description, status, DMname, players, dateStarted, dateEnded } = info || ({} as ICampaign);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bgColor={statusCampaignColorMap.get(status as CampaignStatus)} pb={5} borderTopRadius={5} mb={5}>
          <Heading color='white' fontSize={{ base: 'xl', md: '2xl' }}>
            {capitalizeString(campaignName)}
          </Heading>
        </ModalHeader>
        <ModalBody as={VStack} divider={<StackDivider borderColor='gray.200' />} spacing={5} alignItems='flex-start'>
          <SimpleGrid columns={2} spacing={{ base: 10, md: 20 }}>
            <Box>
              <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>General Info:</Heading>
              <Flex direction='column' align='flex-start'>
                <Text>Dungeon Master: {capitalizeString(DMname)}</Text>
                {dateStarted && (
                  <Text>
                    Started: <Moment format='DD/MM/YYYY'>{dateStarted}</Moment>
                  </Text>
                )}
                {dateEnded && (
                  <Text>
                    Ended: <Moment format='DD/MM/YYYY'>{dateEnded}</Moment>
                  </Text>
                )}
              </Flex>
            </Box>
            <Box>
              <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>Players: </Heading>
              {players ? <Players players={players} /> : 'No Players are playing in this campaign'}
            </Box>
          </SimpleGrid>
          <Box>
            <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>Description:</Heading>
            <Text noOfLines={5}>{description}</Text>
          </Box>
        </ModalBody>
        <ModalFooter as={HStack}>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CharacterInfoModal;

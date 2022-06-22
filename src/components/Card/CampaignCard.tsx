import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React, { FC, useState } from 'react';
import Moment from 'react-moment';
import { CampaignStatus, ICampaign, ICampaignCard } from '../../types/campaign';
import { capitalizeString, statusCampaignColorMap } from '../../utils/misc';
import { StyledCardContainer } from './Card';

export const CampaignInfo: FC<ICampaignCard> = ({ DMname, dateStarted, dateEnded }) => (
  <>
    <Text color='white'>
      Dungeon Master: <strong>{capitalizeString(DMname)}</strong>
    </Text>
    <Text color='white'>
      <Moment format='DD/MM/YYYY'>{dateStarted}</Moment>
      {dateEnded && ` - `}
      {dateEnded && <Moment format='DD/MM/YYYY'>{dateEnded}</Moment>}
    </Text>
  </>
);

export type Base<T> = {
  id: string;
  name: string;
  status: T;
  item: ICampaign;
  selectedItem: ICampaign | null;
  setItem: React.Dispatch<React.SetStateAction<ICampaign | null>>;
  setisCampaignViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ICampaignCardContent<T> = Base<T> & {
  imgUrl: string;
  children: React.ReactNode;
};

const Card = <T,>({
  id,
  name,
  status,
  imgUrl,
  children,
  item,
  selectedItem,
  setItem,
  setisCampaignViewModalOpen,
}: ICampaignCardContent<T>): ReactJSXElement => {
  const [isViewButtonVisible, setIsViewButtonVisible] = useState(false);

  return (
    <StyledCardContainer
      direction='column'
      border={2}
      m={10}
      width={{ base: '250px', md: '300px', xl: '350px' }}
      active={selectedItem !== null && id === selectedItem._id}
      onClick={() => setItem(item)}
      onMouseEnter={() => {
        setIsViewButtonVisible(true);
        setItem(item);
      }}
      onMouseLeave={() => {
        setIsViewButtonVisible(false);
      }}
    >
      {isViewButtonVisible && (
        <Button size='lg' position='absolute' bottom='50%' right='35%' onClick={() => setisCampaignViewModalOpen(true)}>
          View
        </Button>
      )}
      <Center
        borderTopRadius={10}
        height={{ base: '20px', md: '30px', xl: '30px' }}
        bgColor={statusCampaignColorMap.get(status as unknown as CampaignStatus)}
      >
        <Heading color='white' fontSize={{ base: 'md', md: 'md', xl: 'md' }}>
          {typeof status === 'string' && status.toUpperCase()}
        </Heading>
      </Center>
      <Flex
        direction='column'
        justify='flex-end'
        height={{ base: '150px', md: '200px', xl: '250px' }}
        border='1px'
        borderColor='primary'
        borderBottomRadius={12}
        backgroundImage={imgUrl}
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
      >
        <Flex direction='column' justify='center' align='center' bgColor='primary' borderBottomRadius={10} py={2}>
          <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color='white'>
            {capitalizeString(name)}
          </Heading>
          {children}
        </Flex>
      </Flex>
    </StyledCardContainer>
  );
};

export default Card;

import { Button, Center, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { CharacterClass, CharacterGender, CharacterRace, CharacterStatus, ICharacter } from '../../types/character';
import { capitalizeString, classColorMap, statusCharColorMap } from '../../utils/misc';

export const StyledCardContainer = styled(Flex)<{ active: boolean }>`
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    border: 0px solid #683998;
    border-radius: 10px;
    box-shadow: 0 0 15px #683998;
    transform: scale(1.1);
  }
  ${({ active }) =>
    active
      ? css`
          border: 0px solid #683998;
          border-radius: 10px;
          box-shadow: 0 0 15px #683998;
        `
      : null}
`;

export interface CharInfoProps {
  gender?: CharacterGender;
  race: CharacterRace;
  characterClass: string;
  level: number;
}

export const CharacterInfo: FC<CharInfoProps> = ({ gender = CharacterGender.OTHER, race, characterClass, level }) => (
  <>
    <Text color='white'>
      {capitalizeString(gender)} {capitalizeString(race)}
    </Text>
    <Text color='white'>
      Level {level} {capitalizeString(characterClass)}
    </Text>
  </>
);

export type Base<T> = {
  id: string;
  name: string;
  status: T;
  item: ICharacter;
  selectedItem: ICharacter | null;
  setItem: React.Dispatch<React.SetStateAction<ICharacter | null>>;
  setisCharacterViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ICardContent<T> = Base<T> & {
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
  setisCharacterViewModalOpen,
}: ICardContent<T>): ReactJSXElement => {
  const [isViewButtonVisible, setIsViewButtonVisible] = useState(false);

  return (
    <StyledCardContainer
      position='relative'
      direction='column'
      border={2}
      m='auto'
      width={{ base: '200px', md: '200px', xl: '200px' }}
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
        <Button
          size='lg'
          position='absolute'
          bottom='50%'
          right='35%'
          onClick={() => setisCharacterViewModalOpen(true)}
        >
          View
        </Button>
      )}
      <Center
        borderTopRadius={10}
        height={{ base: '20px', md: '30px', xl: '30px' }}
        bg={statusCharColorMap.get(item.status)}
      >
        <Heading color='white' fontSize={{ base: 'md', md: 'md', xl: 'md' }}>
          {typeof status === 'string' && status.toUpperCase()}
        </Heading>
      </Center>
      <Flex
        direction='column'
        justify='flex-end'
        height={{ base: '300px', md: '300px', xl: '350px' }}
        border='1px'
        borderColor={classColorMap.get(item.characterClass as CharacterClass)}
        borderBottomRadius={12}
        backgroundImage={imgUrl}
        backgroundSize='cover'
        backgroundRepeat='no-repeat'
      >
        <Flex
          direction='column'
          justify='center'
          align='center'
          bgColor={classColorMap.get(item.characterClass as CharacterClass)}
          borderBottomRadius={10}
          py={2}
        >
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

import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { NullLiteral } from 'typescript';
import { CharacterGender, CharacterRace, ICharacter, colorMap } from '../../types/character';
import { capitalizeString } from '../../utils/misc';

const StyledCardContainer = styled(Flex)<{ active: boolean }>`
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
}: ICardContent<T>): ReactJSXElement => (
  <StyledCardContainer
    direction='column'
    border={2}
    m={10}
    width={{ base: '125px', md: '150px', xl: '200px' }}
    active={selectedItem !== null && id === selectedItem._id}
    onClick={() => setItem(item)}
  >
    <Center borderTopRadius={10} height={{ base: '20px', md: '30px', xl: '30px' }} bg='primary'>
      <Heading color='white' fontSize={{ base: 'md', md: 'md', xl: 'md' }}>
        {typeof status === 'string' && status.toUpperCase()}
      </Heading>
    </Center>
    <Flex
      direction='column'
      justify='flex-end'
      // width={{ base: '125px', md: '125px', xl: '200px' }}
      height={{ base: '300px', md: '300px', xl: '350px' }}
      border='2px'
      borderColor='primary'
      borderBottomRadius={10}
      backgroundImage={imgUrl}
      backgroundSize='cover'
      backgroundRepeat='no-repeat'
    >
      <Flex direction='column' justify='center' align='center' bgColor='primary' borderBottomRadius={5}>
        <Heading fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color='white'>
          {capitalizeString(name)}
        </Heading>
        {children}
      </Flex>
    </Flex>
  </StyledCardContainer>
);

export default Card;

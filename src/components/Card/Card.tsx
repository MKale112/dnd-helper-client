import React, { FC } from 'react';
import styled from 'styled-components';
import { string } from 'yup/lib/locale';
import { EPurpose } from '../../types/types';

const CardContainer = styled.div`
  background-color: #f0f0f0;
  border: 3px solid;
  border-radius: 10px;
  height: 400px;
  width: 300px;

  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledDescription = styled.div``;

type IDescriptionProps = ICardProps;

const Description: FC<IDescriptionProps> = ({ name, characterClass, race }) => (
  <StyledDescription>
    <p>{name}</p>
    <p>
      {race} {characterClass}
    </p>
  </StyledDescription>
);

interface ICardProps {
  purpose: EPurpose;
  name: string;
  characterClass?: string;
  race?: string;
  status?: string;
}

const Card: FC<ICardProps> = ({ purpose, name, characterClass, race }) => (
  <CardContainer>
    <Description purpose={purpose} name={name} characterClass={characterClass} race={race} />
  </CardContainer>
);

export default Card;

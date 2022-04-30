import React, { FC } from 'react';
import styled from 'styled-components';

const CharacterCard = styled.div`
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

const Character: FC = () => <CharacterCard />;

export default Character;

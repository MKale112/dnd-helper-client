import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled.img`
  height: 40px;
  width: auto;
`;

const Logo: FC = () => (
  <RouterLink to='/'>
    <LogoWrapper src='/logo.png' />
  </RouterLink>
);

export default Logo;

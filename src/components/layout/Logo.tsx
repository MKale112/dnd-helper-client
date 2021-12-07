import React, { FC } from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.img`
  height: 40px;
  width: auto;
`;

const Logo: FC = () => <LogoWrapper src='/logo.png' />;

export default Logo;

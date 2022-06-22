import React, { FC } from 'react';
import { ErrorMessage, ErrorMessageProps } from 'formik';
import styled from 'styled-components';

const StyledErrorMessage = styled.p`
  color: red;
  font-weight: 500;
`;

const CustomErrorMessage: FC<ErrorMessageProps> = ({ name }) => (
  <ErrorMessage name={name}>{(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
);
export default CustomErrorMessage;

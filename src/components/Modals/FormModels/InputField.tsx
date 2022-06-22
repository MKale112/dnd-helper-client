import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import React, { FC } from 'react';
import CustomErrorMessage from './CustomErrorMessage';

export interface Props extends FieldProps {
  placeholder?: string;
  label: string;
  width?: string;
}

const InputField: FC<Props> = ({ placeholder = '', label, width, field }) => (
  <FormControl mb='5'>
    <FormLabel>{label}: </FormLabel>
    <Input width={width} placeholder={placeholder} {...field} />
    <CustomErrorMessage name={field.name} />
  </FormControl>
);

export default InputField;

import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import React, { FC } from 'react';

interface Props extends FieldProps {
  placeholder: string;
  label: string;
}

const InputField: FC<Props> = ({ placeholder, label, field }) => (
  <FormControl>
    <FormLabel>{label}: </FormLabel>
    <Input placeholder={placeholder} {...field} />
  </FormControl>
);

export default InputField;

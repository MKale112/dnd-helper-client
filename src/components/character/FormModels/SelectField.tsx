import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import React, { FC } from 'react';

interface Props extends FieldProps {
  label: string;
  options: string[];
}

const SelectField: FC<Props> = ({ label, options, field }) => (
  <FormControl>
    <FormLabel>{label}: </FormLabel>
    <Select {...field}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default SelectField;

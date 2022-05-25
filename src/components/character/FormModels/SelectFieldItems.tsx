import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import React, { FC } from 'react';
import CustomErrorMessage from './CustomErrorMessage';

interface Item {
  name: string;
  description: string;
}

interface Props extends FieldProps {
  label: string;
  options: Item[];
}

const SelectFieldItems: FC<Props> = ({ label, options, field }) => (
  <FormControl mb='5'>
    {console.log(options[0])}
    <FormLabel>{label}: </FormLabel>
    <Select {...field} defaultValue=''>
      {options.map((option) => (
        <option key={option.name} value={option.name}>
          {`${option.name} : ${option.description}`}
        </option>
      ))}
    </Select>
    <CustomErrorMessage name={field.name} />
  </FormControl>
);

export default SelectFieldItems;

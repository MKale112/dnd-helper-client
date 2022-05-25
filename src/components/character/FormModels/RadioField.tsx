import { FormControl, FormLabel, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import React, { FC } from 'react';
import CustomErrorMessage from './CustomErrorMessage';

interface Props extends FieldProps {
  label: string;
  name: string;
}

const RadioField: FC<Props> = ({ label, name, field }) => {
  const { onChange, ...rest } = field;

  return (
    <FormControl mb='5'>
      <FormLabel>{label}: </FormLabel>
      <RadioGroup {...rest} name={name}>
        <Stack direction='row'>
          <Radio {...field} value='male' onChange={onChange}>
            Male
          </Radio>
          <Radio {...field} value='female' onChange={onChange}>
            Female
          </Radio>
          <Radio {...field} value='other' onChange={onChange}>
            Other
          </Radio>
        </Stack>
      </RadioGroup>
      <CustomErrorMessage name={field.name} />
    </FormControl>
  );
};
export default RadioField;

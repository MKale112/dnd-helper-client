import React, { FC, ReactElement } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { ErrorMessage, Field, Formik, FormikConfig, FormikProps, FormikValues } from 'formik';
import InputField from '../FormModels/InputField';
import { CharacterCreationInput } from '../../../types/character';
import SelectField from '../FormModels/SelectField';

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label?: string;
}

export const FormikStep = ({ children }: FormikStepProps): ReactElement => <>{children}</>;

const CharacterBasicInfoForm: FC = () => (
  <FormikStep>
    <Box>
      <Field
        component={InputField}
        name='characterName'
        type='text'
        label='Character Name'
        placeholder='i.e. Frodo Baggins'
      />
      <ErrorMessage name='characterName' />
    </Box>

    <Field
      component={SelectField}
      name='race'
      type='select'
      label='Choose your Race'
      options={['human', 'elf', 'dwarf', 'halfling', 'orc']}
    />
    <ErrorMessage name='race' />

    <Field
      component={SelectField}
      name='characterClass'
      type='select'
      label='Choose your Class'
      options={['fighter', 'mage', 'rogue']}
    />
    <ErrorMessage name='characterClass' />
  </FormikStep>
);

export default CharacterBasicInfoForm;

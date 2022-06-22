import { Center, Grid, GridItem } from '@chakra-ui/react';
import { Field } from 'formik';
import React, { FC } from 'react';
import InputField from '../FormModels/InputField';

const CharacterAttributesForm: FC = () => (
  <>
    <Grid templateColumns='1fr 1fr' spacing='4'>
      <GridItem colSpan={1} px={5} py={3}>
        <Field component={InputField} name='attributes.strength' type='number' label='Strength' />

        <Field component={InputField} name='attributes.dexterity' type='number' label='Dexterity' />

        <Field component={InputField} name='attributes.constitution' type='number' label='Constitution' />
      </GridItem>

      <GridItem colSpan={1} px={5} py={3}>
        <Field component={InputField} name='attributes.intelligence' type='number' label='Intelligence' />

        <Field component={InputField} name='attributes.wisdom' type='number' label='Wisdom' />

        <Field component={InputField} name='attributes.charisma' type='number' label='Charisma' />
      </GridItem>
    </Grid>
  </>
);

export default CharacterAttributesForm;

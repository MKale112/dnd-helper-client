import React, { FC } from 'react';
import { Field } from 'formik';
import InputField from '../FormModels/InputField';
import SelectField from '../FormModels/SelectField';
import RadioField from '../FormModels/RadioField';

const CharacterBasicInfoForm: FC = () => (
  <>
    <Field
      component={InputField}
      name='characterName'
      type='text'
      label='Character Name'
      placeholder='i.e. Frodo Baggins'
    />

    <Field component={RadioField} name='gender' label='Gender' />

    <Field
      component={SelectField}
      name='race'
      type='select'
      label='Choose your Race'
      options={['human', 'elf', 'dwarf', 'halfling', 'orc']}
    />

    <Field
      component={SelectField}
      name='characterClass'
      type='select'
      label='Choose your Class'
      options={['fighter', 'wizard', 'rogue']}
    />

    <Field
      component={InputField}
      name='level'
      type='number'
      label='What is the current level of your character'
      width='20%'
    />
  </>
);

export default CharacterBasicInfoForm;

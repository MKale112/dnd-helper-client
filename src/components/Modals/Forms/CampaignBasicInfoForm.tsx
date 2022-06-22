import React, { FC } from 'react';
import { Field } from 'formik';
import InputField from '../FormModels/InputField';

const CharacterBasicInfoForm: FC = () => (
  <>
    <Field
      component={InputField}
      name='campaignName'
      type='text'
      label='Campaign Name'
      placeholder='i.e. Vox Machina'
    />

    <Field
      component={InputField}
      name='description'
      type='text'
      label='Description'
      placeholder='i.e. Once upon a time ...'
    />

    <Field
      component={InputField}
      name='imageUrl'
      type='text'
      label='Do you have an image for your campaign'
      placeholder='i.e. https://unsplash.com/photos/5EUh-tq31eA'
    />
  </>
);

export default CharacterBasicInfoForm;

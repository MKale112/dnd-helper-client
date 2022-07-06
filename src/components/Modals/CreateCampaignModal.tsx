import React, { FC, ReactElement, useState } from 'react';
import { Formik, FormikConfig, FormikValues, Form, FormikState } from 'formik';
import * as yup from 'yup';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Center,
  Heading,
  ModalCloseButton,
} from '@chakra-ui/react';
import { CharacterCreationInput, CharacterGender, CharacterRace, ICharacter } from '../../types/character';
import CampaignBasicInfoForm from './Forms/CampaignBasicInfoForm';
import { ICampaign, ICampaignInput } from '../../types/campaign';

const errorMessages = {
  fieldRequired: 'Field is required',
  notNegative: 'Field cannot have negative value',
  isNum: 'Field must be a number',
  minVal: 'This stat can have a minimum value of 3',
  maxVal: 'This stat can have a maximum value of 30',
  min: 'Field must have minimal value of 10',
  levels: 'Levels go from 1 to 20!',
};

const validationSchema = yup.object().shape({
  campaignName: yup.string().required(errorMessages.fieldRequired),
  description: yup.string(),
  imgUrl: yup.string(),
});

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  submitCampaign: (values: FormikValues) => void;
  updateValues?: ICampaign | null;
}

export const CreateCampaignModal: FC<Props> = ({
  isOpen,
  onClose,
  submitCampaign,
  updateValues = null,
}): ReactElement => {
  const initialValues: ICampaignInput = {
    campaignName: '',
    description: '',
    imgUrl: '',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          // eslint-disable-next-line
          initialValues={updateValues ? updateValues : initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, helpers) => {
            helpers.setSubmitting(true);
            submitCampaign(values);

            helpers.setSubmitting(false);
          }}
        >
          {({ isSubmitting, handleSubmit, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              <ModalHeader>
                <Center my='6'>
                  <Heading size='lg'>CREATE A NEW CAMPAIGN!</Heading>
                </Center>
              </ModalHeader>

              <ModalBody>
                <CampaignBasicInfoForm />
              </ModalBody>

              <ModalFooter gridGap='5'>
                <Button
                  variant='danger-btn'
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button variant='forward-btn' type='submit'>
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>

        <ModalCloseButton onClick={onClose} />
      </ModalContent>
    </Modal>
  );
};

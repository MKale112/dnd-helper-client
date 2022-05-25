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
  Spinner,
  Center,
  Heading,
  ModalCloseButton,
} from '@chakra-ui/react';
import { CharacterCreationInput, CharacterGender, CharacterRace } from '../../types/character';
import CharacterBasicInfoForm from './Forms/CharacterBasicInfoForm';
import CharacterAttributesForm from './Forms/CharacterAttributesForm';
import CharacterMiscForm from './Forms/CharacterMiscForm';

const steps = ['Name, Race and Class', 'Character Attributes', 'Misc.'];

const errorMessages = {
  fieldRequired: 'Field is required',
  notNegative: 'Field cannot have negative value',
  isNum: 'Field must be a number',
  minVal: 'This stat can have a minimum value of 3',
  maxVal: 'This stat can have a maximum value of 30',
  min: 'Field must have minimal value of 10',
  levels: 'Levels go from 1 to 20!',
};

const validationSchema = [
  yup.object().shape({
    characterName: yup.string().required(errorMessages.fieldRequired),
    gender: yup.string().required(errorMessages.fieldRequired),
    race: yup.string().required(errorMessages.fieldRequired),
    characterClass: yup.string().required(errorMessages.fieldRequired),
    level: yup.number().min(1, errorMessages.levels).max(20, errorMessages.levels),
  }),
  yup.object({
    attributes: yup.object({
      strength: yup
        .number()
        .integer(errorMessages.isNum)
        .min(3, errorMessages.minVal)
        .max(30, errorMessages.maxVal)
        .required(errorMessages.fieldRequired),
      dexterity: yup
        .number()
        .integer(errorMessages.isNum)
        .min(3, errorMessages.minVal)
        .max(30, errorMessages.maxVal)
        .required(errorMessages.fieldRequired),
      constitution: yup
        .number()
        .integer(errorMessages.isNum)
        .min(3, errorMessages.minVal)
        .max(30, errorMessages.maxVal)
        .required(errorMessages.fieldRequired),
      intelligence: yup
        .number()
        .integer(errorMessages.isNum)
        .min(3, errorMessages.minVal)
        .max(30, errorMessages.maxVal)
        .required(errorMessages.fieldRequired),
      wisdom: yup
        .number()
        .integer(errorMessages.isNum)
        .min(3, errorMessages.minVal)
        .max(30, errorMessages.maxVal)
        .required(errorMessages.fieldRequired),
      charisma: yup
        .number()
        .integer(errorMessages.isNum)
        .min(3, errorMessages.minVal)
        .max(30, errorMessages.maxVal)
        .required(errorMessages.fieldRequired),
    }),
  }),
  yup.object({
    weapon: yup.string(),
    armor: yup.string(),
    shield: yup.boolean(),
    money: yup.object({
      cp: yup.number().integer(errorMessages.isNum).positive(errorMessages.notNegative),
      sp: yup.number().integer(errorMessages.isNum).positive(errorMessages.notNegative),
      gp: yup.number().integer(errorMessages.isNum).positive(errorMessages.notNegative),
    }),
    bio: yup.string().max(1000, "C'mon, your DM is already getting a headache!"),
  }),
];

interface IFormikStepperProps extends FormikConfig<FormikValues> {
  updateRequest: () => void;
  submitCharacter: (values: FormikValues) => void;
  closeModal: () => void;
}

export const FormikStepper = ({
  submitCharacter,
  updateRequest,
  closeModal,
  children,
  ...props
}: IFormikStepperProps): ReactElement => {
  const [formStep, setFormStep] = useState(0);

  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const currentChild = childrenArray[formStep];
  const currentValidationSchema = validationSchema[formStep];

  function isLastStep(): boolean {
    return formStep === steps.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, helpers) => {
        helpers.setSubmitting(true);
        if (isLastStep()) {
          props.onSubmit(values, helpers);
          submitCharacter(values);
        } else {
          console.log('in Update');
          props.onSubmit(values, helpers);
          setFormStep(formStep + 1);
        }
        helpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, resetForm }) => (
        <Form onSubmit={handleSubmit}>
          <ModalHeader>
            <Center my='6'>
              <Heading size='lg'>CREATE A NEW CHARACTER!</Heading>
            </Center>
            <h3>
              STEP {formStep + 1}: {steps[formStep]}
            </h3>
          </ModalHeader>

          <ModalBody>{currentChild}</ModalBody>

          <ModalFooter gridGap='5'>
            <Button
              onClick={() => {
                closeModal();
                resetForm();
              }}
            >
              Cancel
            </Button>
            {formStep > 0 && (
              <Button disabled={isSubmitting} onClick={() => setFormStep(formStep - 1)}>
                Back
              </Button>
            )}
            <Button type='submit'>{isLastStep() ? 'Submit' : 'Next'}</Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label?: string;
  values?: FormikState<FormikValues>;
}

export const FormikStep = ({ children }: FormikStepProps): ReactElement => <>{children}</>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submitCharacter: (values: FormikValues) => void;
  updateRequest: () => void;
}

export const CreateCharacterModal: FC<Props> = ({ isOpen, onClose, submitCharacter, updateRequest }): ReactElement => {
  const initialValues: CharacterCreationInput = {
    characterName: '',
    race: CharacterRace.HUMAN,
    gender: CharacterGender.MALE,
    characterClass: '',
    level: 1,
    attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
    weapon: '',
    armor: '',
    shield: false,
    bio: '',
    wallet: { cp: 0, sp: 0, gp: 0 },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <FormikStepper
          initialValues={initialValues}
          submitCharacter={submitCharacter}
          updateRequest={updateRequest}
          closeModal={onClose}
          onSubmit={(values, helpers) => {
            console.log('');
          }}
        >
          <FormikStep>
            <CharacterBasicInfoForm />
          </FormikStep>
          <FormikStep>
            <CharacterAttributesForm />
          </FormikStep>
          {/* <FormikStep>
            <CharacterSkillsForm />
          </FormikStep> */}
          <FormikStep>
            <CharacterMiscForm />
          </FormikStep>
        </FormikStepper>
        <ModalCloseButton onClick={onClose} />
      </ModalContent>
    </Modal>
  );
};

import React, { FC, ReactElement, useState } from 'react';
import { Formik, FormikProps, FormikConfig, FormikValues, Form, FormikHelpers, Field, ErrorMessage } from 'formik';
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
} from '@chakra-ui/react';
import { CharacterCreationInput, CharacterGender, CharacterRace } from '../../types/character';
import CreationSuccess from './CreationSuccess';
import InputField from './FormModels/InputField';
import SelectField from './FormModels/SelectField';

// const steps = ['Name, Race and Class', 'Your Attributes', 'Skills ', 'Misc.'];
const steps = ['Name, Race and Class'];

const validationSchema = [
  yup.object().shape({
    characterName: yup.string().required(),
    race: yup.string().required(),
    // class: yup.string().required(),
  }),
  yup.object().shape({
    strength: yup.number().min(3).max(30).required(),
    dexterity: yup.number().min(3).max(30).required(),
    constitution: yup.number().min(3).max(30).required(),
    intelligence: yup.number().min(3).max(30).required(),
    wisdom: yup.number().min(3).max(30).required(),
    charisma: yup.number().min(3).max(30).required(),
  }),
  yup.object().shape({
    // change this validation!!!
    strength: yup.number().min(3).max(30),
    dexterity: yup.number().min(3).max(30),
    constitution: yup.number().min(3).max(30),
    intelligence: yup.number().min(3).max(30),
    wisdom: yup.number().min(3).max(30),
    charisma: yup.number().min(3).max(30),
  }),
  yup.object().shape({
    strength: yup.number().min(3).max(30),
    dexterity: yup.number().min(3).max(30),
    constitution: yup.number().min(3).max(30),
    intelligence: yup.number().min(3).max(30),
  }),
];

interface IFormikStepperProps extends FormikConfig<FormikValues> {
  updateRequest: () => void;
  submitCharacter: () => void;
}

export const FormikStepper = ({
  submitCharacter,
  updateRequest,
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

  console.log('form step: ', formStep);
  console.log('current validation schema: ', currentValidationSchema.fields);
  console.log('this is the last step: ', isLastStep());

  return (
    <Formik
      {...props}
      validationSchema={currentValidationSchema}
      onSubmit={(values, helpers) => {
        console.log('first');
        if (isLastStep()) {
          props.onSubmit(values, helpers);
        } else {
          setFormStep(formStep + 1);
        }
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <ModalHeader>
            <h2>Create a new character!</h2>
            <h3>
              Step {formStep + 1}: {steps[formStep]}
            </h3>
          </ModalHeader>
          <ModalBody>{currentChild}</ModalBody>

          <ModalFooter>
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
}

export const FormikStep = ({ children }: FormikStepProps): ReactElement => <>{children}</>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submitCharacter: () => void;
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
    skills: {
      acrobatics: false,
      animalHandling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: false,
    },
    armorClass: 10,
    bio: '',
    equipment: [{ name: '', description: 'string' }],
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
          onSubmit={(values, helpers) => {
            console.log(values);
          }}
        >
          <FormikStep>
            <Field
              component={InputField}
              name='characterName'
              type='text'
              label='Character Name'
              placeholder='i.e. Frodo Baggins'
            />
            <ErrorMessage name='characterName' />

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
        </FormikStepper>
      </ModalContent>
    </Modal>
  );
};

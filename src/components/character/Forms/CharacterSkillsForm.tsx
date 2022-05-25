import { Field } from 'formik';
import React, { FC, useState } from 'react';
import { CheckboxGroupField } from '../FormModels/CheckboxField';

const skills = [
  'acrobatics',
  'animalHandling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleightOfHand',
  'stealth',
  'survival',
];

const CharacterSkillsForm: FC = () => (
  <>
    <h3>Choose skills for your character</h3>
    <Field component={CheckboxGroupField} name='skills' labels={skills} />
  </>
);

export default CharacterSkillsForm;

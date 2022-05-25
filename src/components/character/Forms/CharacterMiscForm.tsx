import { FormControl, FormLabel, Heading, SimpleGrid, Textarea } from '@chakra-ui/react';
import { Field } from 'formik';
import React, { FC } from 'react';
import CheckboxField from '../FormModels/CheckboxField';
import CustomErrorMessage from '../FormModels/CustomErrorMessage';
import InputField from '../FormModels/InputField';
import SelectField from '../FormModels/SelectField';

const armorOptions = [
  { armor: 'None', armorClass: 10 },
  { armor: 'Studded Leather', armorClass: 12 },
  { armor: 'Leather', armorClass: 11 },
  { armor: 'Breastplate', armorClass: 14 },
  { armor: 'Half Plate', armorClass: 15 },
  { armor: 'Chain Mail', armorClass: 16 },
  { armor: 'Plate', armorClass: 18 },
];

const weaponOptions = [
  { weapon: 'Longsword', damage: '1d8 slashing' },
  { weapon: 'Club', damage: '1d4 bludgeoning' },
  { weapon: 'Spear', damage: '1d6 piercing' },
  { weapon: 'Greataxe', damage: '1d12 slashing' },
  { weapon: 'Whip', damage: '1d4 slashing' },
  { weapon: 'Dagger', damage: '1d4 piercing' },
  { weapon: 'Bow', damage: '1d8 piercing' },
  { weapon: 'Sling', damage: '1d4 bludgeoning' },
  { weapon: 'Crossbow', damage: '1d10 piercing' },
  { weapon: 'Halberd', damage: '1d10 slashing' },
  { weapon: 'Greatsword', damage: '2d6 slashing' },
  { weapon: 'Maul', damage: '2d6 bludgeoning' },
  { weapon: 'Wand', damage: '' },
  { weapon: 'Arcane Focus', damage: '' },
];

const CharacterMiscForm: FC = () => (
  <>
    <Field
      component={SelectField}
      name='armorClass'
      label='Does your character wear armor'
      armorOptions={armorOptions}
    />
    <Field
      component={SelectField}
      name='weapon'
      label='Does your character wield a weapon'
      weaponOptions={weaponOptions}
    />
    <Field component={CheckboxField} name='shield' label='Do you have a shield?' />

    <Heading mb='3' as='h4' size='md'>
      Coin pouch:
    </Heading>
    <SimpleGrid columns={3} spacing='3' mb='3'>
      <Field component={InputField} type='number' name='wallet.cp' label='Copper Pieces' />
      <Field component={InputField} type='number' name='wallet.sp' label='Silver Pieces' />
      <Field component={InputField} type='number' name='wallet.gp' label='Gold Pieces' />
    </SimpleGrid>

    <FormControl width='100%' mb='3'>
      <FormLabel>Your Character&apos;s backstory: </FormLabel>
      <Field as={Textarea} type='text' name='bio' />
      <CustomErrorMessage name='bio' />
    </FormControl>
  </>
);

export default CharacterMiscForm;

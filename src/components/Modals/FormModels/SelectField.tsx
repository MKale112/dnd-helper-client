import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import React, { FC } from 'react';
import CustomErrorMessage from './CustomErrorMessage';

export interface Weapon {
  weapon: string;
  damage: string;
}
export interface Armor {
  armor: string;
  armorClass: number;
}
export interface Props extends FieldProps {
  label: string;
  options?: string[];
  weaponOptions?: Weapon[];
  armorOptions?: Armor[];
}

const SelectField: FC<Props> = ({ label, options, weaponOptions, armorOptions, field }) => (
  <FormControl mb='5'>
    <FormLabel>{label}: </FormLabel>

    {options && (
      <Select {...field} placeholder='...' defaultValue={options[0]}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </Select>
    )}

    {weaponOptions && (
      <Select {...field} defaultValue=''>
        {weaponOptions.map((option) => (
          <option key={option.weapon} value={option.weapon}>
            {`${option.weapon}${option.damage && ' : '}${option.damage}`}
          </option>
        ))}
      </Select>
    )}

    {armorOptions && (
      <Select {...field} defaultValue=''>
        {armorOptions.map((option) => (
          <option key={option.armor} value={option.armor}>
            {`${option.armor} : ${option.armorClass}`}
          </option>
        ))}
      </Select>
    )}
    <CustomErrorMessage name={field.name} />
  </FormControl>
);

export default SelectField;

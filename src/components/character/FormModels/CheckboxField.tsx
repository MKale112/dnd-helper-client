import { Checkbox, CheckboxGroup, FormControl, VStack } from '@chakra-ui/react';
import { FieldProps } from 'formik';
import React, { FC, useEffect, useState } from 'react';

export interface CheckboxGroupProps extends FieldProps {
  labels: string[];
  colorScheme?: string;
}

export const CheckboxGroupField: FC<CheckboxGroupProps> = ({ labels, colorScheme, field }) => {
  const [allowedSkillsCount, setAllowedSkillsCount] = useState(5);
  const [isDisabled, setIsDisabled] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(labels.map((label) => false));
  const [change, setChange] = useState(0);
  console.log(isDisabled, checkboxStates);

  useEffect(() => {
    const count = checkboxStates.filter(Boolean).length;
    console.log(count);
    setAllowedSkillsCount(5 - count);
    console.log('count', allowedSkillsCount);
  }, [change]);

  useEffect(() => {
    /* eslint-disable-next-line no-unused-expressions */
    allowedSkillsCount === 0 && setIsDisabled(true);
  }, [allowedSkillsCount]);

  return (
    <>
      <FormControl mb='5'>
        <CheckboxGroup isDisabled={isDisabled} colorScheme={colorScheme}>
          <VStack>
            {labels.map((label, index) => (
              <Checkbox
                {...field}
                onChange={() => {
                  const checkboxStatesCopy = checkboxStates;
                  checkboxStatesCopy[index] = !checkboxStatesCopy[index];
                  setCheckboxStates(checkboxStatesCopy);
                  setChange(change + 1);
                }}
              >
                {label}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </FormControl>
    </>
  );
};

export interface Props extends FieldProps {
  label: string;
  colorScheme?: string;
}

const CheckboxField: FC<Props> = ({ label, colorScheme = 'red', field }) => (
  <FormControl mb='5'>
    <Checkbox colorScheme={colorScheme} {...field}>
      {label}
    </Checkbox>
  </FormControl>
);
export default CheckboxField;

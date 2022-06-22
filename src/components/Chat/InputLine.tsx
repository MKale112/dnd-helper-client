import React, { ChangeEvent, FC } from 'react';
import { Button, HStack, IconButton, Input } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

const InputLine: FC = (): JSX.Element => {
  const [value, setValue] = React.useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => setValue(event.target.value);

  return (
    <HStack>
      <Input
        variant='filled'
        placeholder='Basic usage'
        size='md'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      />

      <IconButton
        variant='forward-btn'
        size='md'
        icon={<ChatIcon />}
        aria-label='Send Message'
        onClick={() => alert(value)}
      />
    </HStack>
  );
};

export default InputLine;

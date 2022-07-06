import React, { ChangeEvent, FC } from 'react';
import { HStack, IconButton, Input } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

interface InputLineProps {
  sendMessage: (arg: string) => void;
}

const InputLine: FC<InputLineProps> = ({ sendMessage }): JSX.Element => {
  const [value, setValue] = React.useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => setValue(event.target.value);

  return (
    <HStack pl={5}>
      <Input
        variant='filled'
        placeholder='Speak your Mind'
        size='md'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            sendMessage(value);
            setValue('');
          }
        }}
      />

      <IconButton
        variant='forward-btn'
        size='md'
        icon={<ChatIcon />}
        aria-label='Send Message'
        onClick={() => {
          sendMessage(value);
          setValue('');
        }}
      />
    </HStack>
  );
};

export default InputLine;

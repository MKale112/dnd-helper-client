import React, { FC, useState } from 'react';
import { Redirect } from 'react-router';
import { Box, Flex, Heading, HStack, Stack } from '@chakra-ui/layout';
import { Button, FormLabel, Radio, RadioGroup, Input, FormControl } from '@chakra-ui/react';
// REDUX
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ActionCreators } from '../../state';
// Types
import { TGender } from '../../types/types';

export interface FormData {
  name: string;
  email: string;
  password: string;
  passwordRedo: string;
  gender: TGender;
}

export const Register: FC = () => {
  const [formData, setFormData] = useState({} as FormData);
  const { password, passwordRedo, name, email, gender } = formData;
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const { register } = bindActionCreators(ActionCreators, dispatch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (password !== passwordRedo) {
      // fire an alert in this line
      setFormData({ ...formData, password: '', passwordRedo: '' });
    } else {
      try {
        await register({ name, email, password, gender });
        setFormData({} as FormData);
      } catch (err) {
        // console.error(err);
        throw Error;
      }
    }
  };

  return isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <Flex direction='column' justifyContent='center' align='center' width='full'>
      <Box p={8} maxWidth='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
        <form onSubmit={handleSubmit}>
          <Stack spacing='24px'>
            <Heading mb='5px'>Make an account!</Heading>
            <Stack spacing={3}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  variant='filled'
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  variant='filled'
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password </FormLabel>
                <Input
                  variant='filled'
                  type='password'
                  name='password'
                  id='password'
                  placeholder='******'
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Repeat your password </FormLabel>
                <Input
                  variant='filled'
                  type='password'
                  name='passwordRedo'
                  id='passwordRedo'
                  placeholder='******'
                  value={passwordRedo}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
            </Stack>
            <RadioGroup isRequired defaultValue='prefer not to say' name='gender'>
              <FormLabel>Gender</FormLabel>
              <HStack spacing='24px' wrap='wrap'>
                <Box>
                  <Radio value='male' ringColor='blue' onChange={(e) => handleChange(e)}>
                    Male
                  </Radio>
                </Box>
                <Box>
                  <Radio value='female' color='pink' onChange={(e) => handleChange(e)}>
                    Female
                  </Radio>
                </Box>
                <Box>
                  <Radio value='other' color='all' onChange={(e) => handleChange(e)}>
                    Other
                  </Radio>
                </Box>
                <Box>
                  <Radio value='prefer not to say' color='black' onChange={(e) => handleChange(e)}>
                    Prefer not to say
                  </Radio>
                </Box>
              </HStack>
            </RadioGroup>
            <Button bg='primary' color='white' type='submit' value='Submit' mt='24px'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;

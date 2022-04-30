import React, { FC, useState } from 'react';
import { Box, Flex, Heading, Stack } from '@chakra-ui/layout';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
// REDUX
import { bindActionCreators } from 'redux';
import { AuthActionCreators, AlertActionCreators } from '../../state';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { AlertType } from '../../state/actions/alert';
import { FireAlerts } from '../layout/Alert';

export interface FormData {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const [formData, setFormData] = useState({} as FormData);
  const { email, password } = formData;

  const { alert } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const { login } = bindActionCreators(AuthActionCreators, dispatch);
  const { setAlert } = bindActionCreators(AlertActionCreators, dispatch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      setAlert('Both fields must be submitted!', AlertType.ERROR);
    } else {
      try {
        await login({ email, password });
      } catch (err) {
        throw Error;
      }
    }
  };

  return (
    <Flex direction='column' justifyContent='center' align='center' width='full'>
      <Box p={8} maxWidth='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
        <form onSubmit={handleSubmit}>
          <Stack spacing='24px'>
            <Heading>Login</Heading>
            {alert && <FireAlerts alerts={alert} />}
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input type='email' name='email' id='email' value={email} onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl>
                <FormLabel>Password:</FormLabel>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <Button bg='primary' color='white' type='submit' value='Submit' mt='24px'>
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;

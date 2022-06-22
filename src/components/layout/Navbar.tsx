import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Heading,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { bindActionCreators } from 'redux';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { AuthActionCreators } from '../../state';
import Logo from './Logo';

interface TLinks {
  label: string;
  link: string;
}

interface NavlinkProps {
  links: TLinks[];
}

const Navlinks: FC<NavlinkProps> = ({ links }) => {
  const colorVal = useColorModeValue('gray.200', 'gray.700');
  const navigation = links.map((link) => (
    <Center
      key={link.label}
      as={RouterLink}
      to={link.link}
      px='5'
      py='3'
      rounded='md'
      height='full'
      fontSize={{ base: 'lg', md: 'xl', lg: 'xl' }}
      _hover={{
        textDecoration: 'none',
        bg: colorVal,
      }}
    >
      {link.label}
    </Center>
  ));
  return (
    <HStack spacing='5' height='full'>
      {navigation}
    </HStack>
  );
};

export const Nav: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorVal = useColorModeValue('gray.200', 'gray.700');
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { logout } = bindActionCreators(AuthActionCreators, dispatch);

  const guestLinks = [
    { label: 'Sign Up', link: '/register' },
    { label: 'Log in', link: '/login' },
  ];
  const authLinks = [{ label: 'Dashboard', link: '/dashboard' }];

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={{ base: '10', md: '40', lg: '5rem' }}>
        <Flex h='20' alignItems='center' justifyContent='space-between'>
          <Stack
            as={RouterLink}
            direction='row'
            align='center'
            _hover={{ textDecoration: 'none' }}
            to='/'
            height='full'
          >
            <Logo />
            <Heading fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }}>D&amp;D Helper</Heading>
          </Stack>

          <Flex alignItems='center' height='full'>
            {isAuthenticated ? <Navlinks links={authLinks} /> : <Navlinks links={guestLinks} />}

            <Stack direction='row' align='center' spacing='5' height='full'>
              <Button height='full' onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {isAuthenticated && (
                <Menu>
                  <MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW='0' height='full'>
                    <Avatar size='sm' src={user?.avatar} />
                  </MenuButton>

                  <MenuList alignItems='center'>
                    <br />
                    <Center>
                      <Avatar size='2xl' src={user?.avatar} />
                    </Center>
                    <br />
                    <Center>
                      <p>{user?.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Stack>
                      <Link
                        as={RouterLink}
                        to='/account-settings'
                        px='5'
                        py='3'
                        rounded='md'
                        _hover={{
                          textDecoration: 'none',
                          bg: colorVal,
                        }}
                      >
                        Account Settings
                      </Link>
                      <Link
                        as={RouterLink}
                        to='/'
                        px='5'
                        py='3'
                        rounded='md'
                        _hover={{
                          textDecoration: 'none',
                          bg: colorVal,
                        }}
                        onClick={logout}
                      >
                        Log Out
                      </Link>
                    </Stack>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Nav;

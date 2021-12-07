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
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  StackDivider,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { bindActionCreators } from 'redux';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { ActionCreators } from '../../state';
import Logo from './Logo';

interface TLinks {
  label: string;
  link: string;
  style?: string;
}

interface NavlinkProps {
  links: TLinks[];
}

const Navlinks: FC<NavlinkProps> = ({ links }) => {
  const colorVal = useColorModeValue('gray.200', 'gray.700');
  const navigation = links.map((link) => (
    <Link
      as={RouterLink}
      to={link.link}
      px='5'
      py='3'
      rounded='md'
      _hover={{
        textDecoration: 'none',
        bg: colorVal,
      }}
    >
      {link.label}
    </Link>
  ));
  return <>{navigation}</>;
};

export const Nav: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorVal = useColorModeValue('gray.200', 'gray.700');
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { logout } = bindActionCreators(ActionCreators, dispatch);

  const guestLinks = [
    { label: 'Campaigns', link: '/campaignbank' },
    { label: 'Characters', link: '/characterbank' },
    { label: 'Sign Up', link: '/register' },
    { label: 'Log in', link: '/login' },
  ];
  const authLinks = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Campaigns', link: '/campaignbank' },
    { label: 'Characters', link: '/characterbank' },
  ];

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px='4'>
        <Flex h='20' alignItems='center' justifyContent='space-between'>
          <Box>
            <Logo />
          </Box>

          <Flex alignItems='center'>
            <Stack direction='row' spacing='2'>
              {isAuthenticated ? <Navlinks links={authLinks} /> : <Navlinks links={guestLinks} />}
            </Stack>
            <Stack direction='row' spacing='7'>
              <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
              {isAuthenticated && (
                <Menu>
                  <MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW='0'>
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
                    <Stack divider={<StackDivider borderColor='gray.200' />}>
                      {/* <Navlinks links={avatarLinks} /> */}
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

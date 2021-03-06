import React, { FC, ReactNode } from 'react';
import { Center, Container, Stack, Text, useColorModeValue, VisuallyHidden, Button } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from './Logo';

const SocialButton: FC<{ children: ReactNode; label: string; href: string }> = ({ children, label, href }) => (
  <Button
    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
    rounded='full'
    w='15'
    h='15'
    p='10px'
    cursor='pointer'
    height='auto'
    as='a'
    href={href}
    display='inline-flex'
    alignItems='center'
    justifyContent='center'
    transition='background 0.3s ease'
    _hover={{
      bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </Button>
);

const Footer: FC = () => (
  <Center
    // mt='auto'
    bg={useColorModeValue('gray.50', 'gray.900')}
    color={useColorModeValue('gray.700', 'gray.200')}
    w='full'
  >
    <Container
      as={Stack}
      maxW='6xl'
      height='75px'
      p={0}
      direction={{ base: 'column', md: 'row' }}
      spacing='4'
      justify={{ base: 'center', md: 'space-around' }}
      align={{ base: 'center', md: 'center' }}
    >
      <Logo />
      <Text>© 2022 D&amp;D Helper. All rights reserved</Text>
      <Stack direction='row' spacing='6'>
        <SocialButton label='Twitter' href='#'>
          <FaTwitter />
        </SocialButton>
        <SocialButton label='YouTube' href='#'>
          <FaYoutube />
        </SocialButton>
        <SocialButton label='Instagram' href='#'>
          <FaInstagram />
        </SocialButton>
      </Stack>
    </Container>
  </Center>
);

export default Footer;

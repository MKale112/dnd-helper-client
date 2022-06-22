import { Center, Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import fallbackImg from '../../assets/images/fallback.webp';

export interface HeroSectionProps {
  bgColor?: string;
  title: string;
  image?: string;
  imageAlt?: string;
  roundImg?: boolean;
  reverseOrder?: boolean;
  isMobile: boolean;
  children?: React.ReactNode;
}

const HeroSection: FC<HeroSectionProps> = ({
  bgColor = 'white',
  title,
  image = '',
  imageAlt = '',
  roundImg = false,
  reverseOrder = false,
  isMobile = false,
  children,
}) => (
  <Center bg={bgColor} my={{ base: '5rem', md: '7rem' }}>
    <SimpleGrid
      width={{ base: '90%', md: '75%', lg: '60%' }}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 5, md: 10 }}
    >
      <Flex direction='column'>
        <Heading mb={5}>{title}</Heading>
        {children}
      </Flex>
      <Image
        // eslint-disable-next-line
        order={isMobile ? -1 : reverseOrder ? 1 : -1}
        borderRadius={roundImg ? 'full' : 'none'}
        boxSize={{ base: '300px', md: '400px' }}
        margin='auto'
        objectFit='cover'
        src={image}
        alt={imageAlt}
        fallbackSrc={fallbackImg}
      />
    </SimpleGrid>
  </Center>
);

export default HeroSection;

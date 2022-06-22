import React, { FC } from 'react';
import { Box, chakra, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';

interface StatsCardProps {
  title: string;
  stat: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, stat }) => (
  <Stat
    px={{ base: 4, md: 10 }}
    py='5'
    shadow='xl'
    border='2px solid'
    borderColor={useColorModeValue('gray.800', 'gray.500')}
    rounded='lg'
  >
    <StatLabel isTruncated fontWeight='medium'>
      {title}
    </StatLabel>
    <StatNumber fontSize='2xl' fontWeight='medium'>
      {stat}
    </StatNumber>
  </Stat>
);

const Features: FC = () => (
  <Box maxW='6xl' mx='auto' pt={20} px={{ base: 2, sm: 12, md: 17 }}>
    <chakra.h1 textAlign='center' fontSize='4xl' py={10} fontWeight='bold'>
      What can you do here?
    </chakra.h1>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} pb={10}>
      <StatsCard title='Make your own' stat='Characters &amp; Adventures' />
      <StatsCard title='Play with over' stat='20 000 other people' />
      <StatsCard title='Use the latest' stat='Tools &amp; Features' />
    </SimpleGrid>
  </Box>
);
export default Features;

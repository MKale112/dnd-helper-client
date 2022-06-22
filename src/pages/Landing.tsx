import { useMediaQuery, Text, Button } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CaptionCarousel from '../components/layout/CaptionCarousel';
import HeroSection from '../components/HeroSection/HeroSection';
import Features from '../components/layout/Features';
import heroImage from '../assets/images/stock-image-1.webp';
import heroImagePerson from '../assets/images/me.webp';

const Landing: FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 750px)');

  return (
    <>
      {/* <CaptionCarousel /> */}
      <Features />
      <HeroSection isMobile={isMobile} title='Welcome to the Playground!' image={heroImage}>
        <Text mb={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed nulla ullamcorper, hendrerit magna
          et, mattis est. Praesent nunc erat, fermentum non faucibus eget, euismod ut nulla. Pellentesque pretium nibh
          et mauris pharetra, a aliquet risus aliquet. Ut laoreet semper aliquet.
        </Text>
        <Text mb={2}>Praesent eget turpis mauris. Maecenas eu sodales diam.</Text>
        <Text>
          Praesent mollis tellus ante, finibus laoreet lorem facilisis venenatis. Phasellus sit amet tristique ante.
        </Text>
        <Button variant='forward-btn' as={RouterLink} to='/register' mt={5} w={{ base: '150px', md: '200px' }}>
          {isMobile ? 'Join Us' : 'Begin the Adventure'}
        </Button>
      </HeroSection>

      <HeroSection reverseOrder roundImg isMobile={isMobile} title='I made this!' image={heroImagePerson}>
        <Text mb={2}>
          Duis eu ultrices dolor. Sed eu massa pretium, pretium odio a, condimentum risus. Maecenas ante felis, pretium
          ac porttitor at, feugiat in mi. In ligula diam, tempus et dignissim at, auctor vel justo. Donec sodales nec
          purus eget auctor.
        </Text>
        <Text>
          Ut eleifend justo non laoreet sagittis. In fringilla ut lorem eu dapibus. Pellentesque tortor libero, cursus
          in aliquet in, feugiat vel turpis. Praesent ultrices arcu quam, sed sagittis diam auctor sed. Proin sagittis
          congue quam, et hendrerit ligula vestibulum in.
        </Text>
      </HeroSection>
      {/* <Showing /> */}
      {/* <CallToAction /> */}
    </>
  );
};

export default Landing;

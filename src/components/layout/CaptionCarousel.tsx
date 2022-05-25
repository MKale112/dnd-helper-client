import React, { FC } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  // useColorModeValue,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import splashscreen1 from '../../assets/images/splashscreen1.webp';
import splashscreen2 from '../../assets/images/splashscreen2.webp';
import splashscreen3 from '../../assets/images/splashscreen3.webp';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const CaptionCarousel: FC = () => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
  // const bgColor = useColorModeValue('transparent gray.100', 'gray.700')

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      id: 1,
      title: 'The all new virtual tabletop in town!',
      text: 'Embrace the adventure! Gather up ya bois and claim your birthright!',
      imageSrc: splashscreen1,
    },
    {
      id: 2,
      title: 'Join a campaign,',
      text: 'make a character and embark on an adventure with your Dungeon Master!',
      imageSrc: splashscreen2,
    },
    {
      id: 3,
      title: 'I dunno what to write anymore,',
      text: 'this is the 3rd slide alrady, just sign up',
      imageSrc: splashscreen3,
    },
  ];

  return <></>;

  // return (
  //   <Box position='relative' height='800px' width='full' overflow='hidden'>
  //     {/* CSS files for react-slick */}
  //     <link
  //       rel='stylesheet'
  //       type='text/css'
  //       charSet='UTF-8'
  //       href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
  //     />
  //     <link
  //       rel='stylesheet'
  //       type='text/css'
  //       href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
  //     />
  //     {/* Left Icon */}
  //     <IconButton
  //       aria-label='left-arrow'
  //       variant='ghost'
  //       position='absolute'
  //       left={side}
  //       top={top}
  //       transform='translate(0%, -50%)'
  //       zIndex='2'
  //       onClick={() => slider?.slickPrev()}
  //     >
  //       <BiLeftArrowAlt size='50px' color='white' />
  //     </IconButton>
  //     {/* Right Icon */}
  //     <IconButton
  //       aria-label='right-arrow'
  //       variant='ghost'
  //       position='absolute'
  //       right={side}
  //       top={top}
  //       transform='translate(0%, -50%)'
  //       zIndex='2'
  //       onClick={() => slider?.slickNext()}
  //     >
  //       <BiRightArrowAlt size='50px' color='white' />
  //     </IconButton>
  //     {/* Slider */}
  //     {/* eslint-disable react/jsx-props-no-spreading */}
  //     <Slider {...settings} ref={(item) => setSlider(item)}>
  //       {cards.map((card) => (
  //         <Box
  //           key={card.id}
  //           height='5xl'
  //           position='relative'
  //           backgroundPosition='center'
  //           backgroundRepeat='no-repeat'
  //           backgroundSize='cover'
  //           backgroundImage={`url(${card.imageSrc})`}
  //         >
  //           {/* This is the block you need to change, to customize the caption */}
  //           <Container size='container.lg' height='300px' position='relative'>
  //             <Stack spacing='6' w='full' maxW='lg' position='absolute' top='50%' transform='translate(0, -50%)'>
  //               <Heading
  //                 fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
  //                 fontWeight={{ base: '600', md: '600', lg: '800' }}
  //               >
  //                 {card.title}
  //               </Heading>
  //               <Text
  //                 fontSize={{ base: 'lg', lg: 'lg' }}
  //                 fontWeight={{ base: '600', md: '600', lg: '600' }}
  //                 color='white'
  //               >
  //                 {card.text}
  //               </Text>
  //             </Stack>
  //           </Container>
  //         </Box>
  //       ))}
  //     </Slider>
  //   </Box>
  // );
};

export default CaptionCarousel;

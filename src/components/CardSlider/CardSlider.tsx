import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './cardslider.css';
import { Box } from '@chakra-ui/layout';
import { IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

export interface CardSliderProps {
  cards: JSX.Element[];
}

const CardSlider: FC<CardSliderProps> = ({ cards }) => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '-10px' });

  const NextButton: FC = () => (
    <IconButton
      isRound
      aria-label='right-arrow'
      variant='solid'
      colorScheme='red'
      position='absolute'
      right={side}
      top={top}
      transform='translate(0%, -50%)'
      zIndex='3'
      size='20px'
      onClick={() => slider?.slickNext()}
    >
      <ChevronRightIcon boxSize={50} color='white' />
    </IconButton>
  );

  const PrevButton: FC = () => (
    <IconButton
      isRound
      aria-label='left-arrow'
      variant='solid'
      colorScheme='red'
      position='absolute'
      left={side}
      top={top}
      transform='translate(0%, -50%)'
      zIndex='3'
      size='20px'
      onClick={() => slider?.slickPrev()}
    >
      <ChevronLeftIcon boxSize={50} color='white' />
    </IconButton>
  );

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    swipe: true,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
  };

  return (
    <Box height='auto' width='full' overflow='hidden' px={10}>
      <Slider className='slick-track' {...settings} ref={(item) => setSlider(item)}>
        {cards}
      </Slider>
    </Box>
  );
};

export default CardSlider;

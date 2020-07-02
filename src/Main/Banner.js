import React from 'react';
import Slider from 'react-animated-slider';
import CarouselSlider from "react-carousel-slider"
import 'react-animated-slider/build/horizontal.css';

const slides = [
    { title: 'First item', description: 'Lorem ipsum1'},
    { title: 'Second item', description: 'Lorem ipsum2'},
    { title: 'Third item', description: 'Lorem ipsum3'}
  ];

const Banner=()=>(
    <div className="Banner">
        <Slider autoplay={1500}>
            {slides.map((slide, index) => <div key={index}>
                <h2>{slide.title}</h2>
                <div>{slide.description}</div>
            </div>)}
        </Slider>
    </div>
)

export default Banner;


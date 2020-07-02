import React from "react";
import { BrowserRouter } from "react-router-dom";
import Slider from "react-animated-slider";
import CarouselSlider from "react-carousel-slider";
import "react-animated-slider/build/horizontal.css";

import Title from "./Title";

const Root = () => {
  return (
    <BrowserRouter forceRefresh="true">
      {/*새로고침하지 않고도 페이지주소를 교체할 수 있다.*/}
      <Title />
    </BrowserRouter>
  );
};
export default Root;

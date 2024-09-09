/* eslint-disable no-unused-vars */
import React from "react";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../heroSection/style.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export function Herosection() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper lg:w-[60%] h-[10%] object-contain mt-10"
      >
        <SwiperSlide className="">
          <img className="object-contain" src="../1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="object-contain" src="../2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="object-contain" src="../3.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Herosection;

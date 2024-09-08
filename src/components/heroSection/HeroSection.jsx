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
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://img.freepik.com/free-psd/science-template-design_23-2150371006.jpg?w=900&t=st=1721317339~exp=1721317939~hmac=5dd0802534a18bbdf45f6714701d3d5c8aa12a1dd3ac9a73c89773dbbdfc2e02"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.freepik.com/free-psd/science-template-design_23-2150371006.jpg?w=900&t=st=1721317339~exp=1721317939~hmac=5dd0802534a18bbdf45f6714701d3d5c8aa12a1dd3ac9a73c89773dbbdfc2e02"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.freepik.com/free-psd/science-template-design_23-2150371006.jpg?w=900&t=st=1721317339~exp=1721317939~hmac=5dd0802534a18bbdf45f6714701d3d5c8aa12a1dd3ac9a73c89773dbbdfc2e02"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Herosection;

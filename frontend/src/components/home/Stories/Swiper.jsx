import React, { useRef } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css"; // Import your custom styles here
import { Plus } from "@/svg";
import { storiesData } from "@/data/storiesData";

export default function SwiperIk() {
  const swiperRef = useRef(null);

 

  return (
    <>
      <Swiper
        modules={[ Navigation, Pagination]}
        ref={swiperRef}
        slidesPerView={4}
        spaceBetween={30} 
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }}
        
        
      >
        {/* Create Story */}
        <SwiperSlide  key="create-story">
          <div className="flex-none w-20 mt-16 md:mt-0 h-32 lg:w-36 lg:h-60  rounded-xl relative stories-shadow cursor-pointer overflow-hidden bg-white group hover:bg-hover2">
            <div className="relative w-full h-[80%] overflow-hidden rounded-t-xl flex items-center justify-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg"
                alt="Create Story"
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30"></div>
            </div>
            <div className="p-2 text-center text-sm font-semibold z-10 relative flex items-center justify-center">
              {/* Centered Plus Icon */}
              <div className="absolute flex group-hover:border-hover2 items-center justify-center bg-blueColor rounded-full p-1 text-xl font-bold -top-4 z-30 border-4 border-white">
                <Plus color="white" />
              </div>
              <div className="absolute -bottom-8">
                <p className="pb-2">Create Story</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Individual Stories */}
        {storiesData.map((story) => (
          <SwiperSlide key={story.id} virtualIndex={story.id}>
            <div className="flex-none w-20 mt-16 md:mt-0 h-32 md:w-36 md:h-60 rounded-xl relative stories-shadow cursor-pointer overflow-hidden bg-white group hover:bg-hover2">
              <div className="relative w-full h-full overflow-hidden rounded-t-xl flex items-center justify-center">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30"></div>
                <p className="absolute bottom-2 font-semibold text-sm text-white z-20">
                  {story.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </>
  );
}

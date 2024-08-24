import { Plus } from "@/svg"; // Assuming Plus is an SVG component you've created
import React, { useState } from "react";
import SwiperIk from "./Swiper";

const storiesData = [
  {
    id: 1,
    name: "Beauty Nature",
    image:
      "https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_1280.jpg",
  },
  {
    id: 2,
    name: "Adventure",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
  },
  {
    id: 1,
    name: "Beauty Nature",
    image:
      "https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_1280.jpg",
  },
  {
    id: 2,
    name: "Adventure",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
  },
  {
    id: 1,
    name: "Beauty Nature",
    image:
      "https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_1280.jpg",
  },
  {
    id: 2,
    name: "Adventure",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
  },
  {
    id: 1,
    name: "Beauty Nature",
    image:
      "https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_1280.jpg",
  },
  {
    id: 2,
    name: "Adventure",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
  },
  {
    id: 1,
    name: "Beauty Nature",
    image:
      "https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_1280.jpg",
  },
  {
    id: 2,
    name: "Adventure",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
  },
  {
    id: 3,
    name: "City Life",
    image:
      "https://cdn.pixabay.com/photo/2015/07/14/18/18/urban-845808_1280.jpg",
  },
  {
    id: 4,
    name: "Peaceful Waters",
    image:
      "https://cdn.pixabay.com/photo/2016/03/09/09/19/sunset-1245754_1280.jpg",
  },
  // Add more stories as needed
];

const Stories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const storiesPerView = 3; // Number of stories visible at a time
  console.log(currentIndex + storiesPerView ," " + storiesData.length);
  const handleNext = () => {
    if (currentIndex + storiesPerView < storiesData.length) {
      setCurrentIndex(currentIndex + storiesPerView);
    }
  };

  const handlePrev = () => {
    if (currentIndex - storiesPerView >= 0) {
      setCurrentIndex(currentIndex - storiesPerView);
    }
  };

  return (
    <div className="relative flex items-center p-4 rounded-xl">
      


      
<SwiperIk />
    </div>
  );
};

export default Stories;

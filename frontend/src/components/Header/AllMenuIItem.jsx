import React from "react";
import { menu } from "@/data/allMenu";


const AllMenuIItem = () => {
   
  return (
    <div className="w-full h-full ">
      <h3 className="text-start text-lg font-semibold px-4 pb-2">Social</h3>
      <div className="flex flex-col gap-1 border-b pb-4">
        {menu.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-secondaryColorBg px-2 rounded-lg py-1 gap-3 cursor-pointer"
          >
            <img
              src={`../../../public/left/${item.icon}.png`}
              alt=""
              className="h-8 w-8"
            />
            <div className="flex items-start justify-center flex-col">
              <p className="text-[16px] font-semibold">{item.name}</p>
              <p className="text-start text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-start text-lg font-semibold px-4  py-3">
        Entertainment
      </h3>
      <div className="flex flex-col gap-1 border-b pb-4">
        {menu.slice(6, 9).map((item, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-secondaryColorBg px-2 rounded-lg py-1 gap-3 cursor-pointer"
          >
            <img
              src={`../../../public/left/${item.icon}.png`}
              alt=""
              className="h-8 w-8"
            />
            <div className="flex items-start justify-center flex-col">
              <p className="text-[16px] font-semibold">{item.name}</p>
              <p className="text-start text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-start text-lg font-semibold px-4  py-3">
      Shopping
      </h3>
      <div className="flex flex-col gap-1 border-b pb-4">
        {menu.slice(9, 11).map((item, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-secondaryColorBg px-2 rounded-lg py-1 gap-3 cursor-pointer"
          >
            <img
              src={`../../../public/left/${item.icon}.png`}
              alt=""
              className="h-8 w-8"
            />
            <div className="flex items-start justify-center flex-col">
              <p className="text-[16px] font-semibold">{item.name}</p>
              <p className="text-start text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-start text-lg font-semibold px-4  py-3">
      Personal
      </h3>
      <div className="flex flex-col gap-1 border-b pb-4">
        {menu.slice(11, 15).map((item, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-secondaryColorBg px-2 rounded-lg py-1 gap-3 cursor-pointer"
          >
            <img
              src={`../../../public/left/${item.icon}.png`}
              alt=""
              className="h-8 w-8"
            />
            <div className="flex items-start justify-center flex-col">
              <p className="text-[16px] font-semibold">{item.name}</p>
              <p className="text-start text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-start text-lg font-semibold px-4  py-3">
      Professional
      </h3>
      <div className="flex flex-col gap-1 border-b pb-4">
        {menu.slice(15, 17).map((item, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-secondaryColorBg px-2 rounded-lg py-1 gap-3 cursor-pointer"
          >
            <img
              src={`../../../public/left/${item.icon}.png`}
              alt=""
              className="h-8 w-8"
            />
            <div className="flex items-start justify-center flex-col">
              <p className="text-[16px] font-semibold">{item.name}</p>
              <p className="text-start text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-start text-lg font-semibold px-4  py-3">
      Community Resources
      </h3>
      <div className="flex flex-col gap-1 border-b pb-4">
        {menu.slice(17, 21).map((item, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-secondaryColorBg px-2 rounded-lg py-1 gap-3 cursor-pointer"
          >
            <img
              src={`../../../public/left/${item.icon}.png`}
              alt=""
              className="h-8 w-8"
            />
            <div className="flex items-start justify-center flex-col">
              <p className="text-[16px] font-semibold">{item.name}</p>
              <p className="text-start text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-start text-lg font-semibold px-4  py-3">
      More from Meta
      </h3>
      <div className="flex flex-col gap-1 border-b pb-4">
        {menu.slice(21, 23).map((item, index) => (
          <div
            key={index}
            className="flex items-center hover:bg-secondaryColorBg px-2 rounded-lg py-1 gap-3 cursor-pointer"
          >
            <img
              src={`../../../public/left/${item.icon}.png`}
              alt=""
              className="h-8 w-8"
            />
            <div className="flex items-start justify-center flex-col">
              <p className="text-[16px] font-semibold">{item.name}</p>
              <p className="text-start text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMenuIItem;

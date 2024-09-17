import React, { useState } from "react";

const PreviewImage = () => {
  const [images, setImages] = useState([]);
  return (
    <div className=" p-2 border  rounded-lg">
    <div className="w-full   cursor-pointer   rounded-xl flex-col flex items-center justify-between gap-2">
      <input
        type="file"
        multiple
        hidden
        onChange={(e) => setImages(e.target.files)}
      />
      {images.length > 0 ? (
        images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt="image" />
        ))
      ) : (
        
          <div className=" w-full rounded-lg relative p-8 h-full hover:bg-secondaryColorBg bg-secondaryColor2 flex items-center justify-center " >
            <div className="absolute top-2 right-2 rounded-full  bg-white flex items-center justify-center p-1.5 border-shadow cursor-pointer">
              <i className="exit_icon " ></i>
            </div>
            <div
              className="flex items-center justify-center flex-col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle bg-iconsBg w-10 h-10 flex items-center justify-center rounded-full">
                <i className="addPhoto_icon"></i>
              </div>
              <span className="font-bold ">Add Photos/Videos</span>
              <span className="text-sm">or drag and drop</span>
            </div>
          </div>
       
      )}
        <div className="flex justify-between p-4 bg-secondaryColor2 w-full rounded-lg items-center">
          <div className="bg-iconsBg rounded-full  flex items-center justify-center w-10 h-10">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add phots from your mobile device.</div>
          <span className="bg-iconsBg px-3 py-2 text-sm font-bold rounded-lg">Add</span>
        </div>
    </div>
    
  </div>
  );
};

export default PreviewImage;

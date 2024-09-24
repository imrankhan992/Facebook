import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const Emoji = ({
  handleEmoji,
  handleEmojiPickerClick,
  ref,
  showPicker,
  postText,
  showImageUpload,
  background, setBackground,
  selectedBg, setSelectedBg,
  postBackgrounds,
  bgRef,
}) => {
  

  
  

  // Handle background image click
  const handleBackgroundClick = (bg) => {
    setSelectedBg(bg); 
  };

  return (
    <div
      className={`relative flex items-center  overflow-hidden ${
        postText?.length > 84 || showImageUpload
          ? "justify-end"
          : "justify-between"
      }`}
    >
      {/* Display the background images */}
      {!showImageUpload && postText?.length < 84 && (
        <img
          src="../../../icons/colorful.png"
          width={40}
          height={40}
          alt="post"
          className="cursor-pointer"
          onClick={() => {setBackground(!background)}}
        />
      )}

      {!showImageUpload && (
        <div className="flex items-center justify-center gap-2">
          

          {/* Display the rest of the backgrounds around it */}
          <div className="flex gap-2">
          {background&&  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2000px-Solid_white.svg.png"  onClick={() => {bgRef.current.style.backgroundImage = ""; setSelectedBg("")}} className="rounded-lg cursor-pointer" width={30} height={30}  alt="" />}
            {background&& postBackgrounds?.map((bg, i) => (
              <img
                key={i}
                src={bg}
                alt={`bg-${i}`}
                width={40}
                height={40}
                className={`rounded-lg cursor-pointer ${
                  selectedBg === bg ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => {handleBackgroundClick(bg); }} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      <div className="relative flex items-center justify-end hover:bg-blueColor/10 right-0 rounded-full group">
        <i
          onClick={handleEmojiPickerClick}
          className="emoji_icon_large cursor-pointer"
        ></i>
        <span className="absolute group-hover:block hidden -top-10 rounded-lg -left-10 font-semibold bg-black/75 px-2 py-1 text-white">
          emoji
        </span>

        {showPicker && (
          <div
            ref={ref}
            className="absolute  bottom-full mb-2 right-0 emoji-box-shadow"
          >
            <EmojiPicker
              previewConfig={{ showPreview: false }}
              searchDisabled={true}
              onEmojiClick={handleEmoji}
              width="250px"
              height="250px"
              disableAutoFocus={true}
              emojiStyle="Facebook"
             
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Emoji;

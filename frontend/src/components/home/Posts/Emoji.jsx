import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const Emoji = ({
  handleEmoji,
  handleEmojiPickerClick,
  ref,
  showPicker,
  postText,
  showImageUpload,
  background,
  setBackground,
  selectedBg,
  setSelectedBg,
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
          onClick={() => {
            setBackground(!background);
          }}
        />
      )}

      {!showImageUpload && (
        <div className="flex items-center justify-center gap-2">
          {/* Display the rest of the backgrounds around it */}
          <div className="flex gap-2">
            {background && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2000px-Solid_white.svg.png"
                onClick={() => {
                  bgRef.current.style.backgroundImage = "";
                  setSelectedBg("");
                }}
                className="rounded-lg cursor-pointer"
                width={30}
                height={30}
                alt=""
              />
            )}
            {background &&
              postBackgrounds?.map((bg, i) => (
                <img
                  key={i}
                  src={bg}
                  alt={`bg-${i}`}
                  width={40}
                  height={40}
                  className={`rounded-lg cursor-pointer ${
                    selectedBg === bg ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    handleBackgroundClick(bg);
                  }}
                />
              ))}
          </div>
        </div>
      )}

      {/* Emoji Picker */}

      <i
        onClick={handleEmojiPickerClick}
        className="emoji_icon_large cursor-pointer"
      ></i>
    </div>
  );
};

export default Emoji;

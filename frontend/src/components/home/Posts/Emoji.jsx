import React from "react";
import EmojiPicker from "emoji-picker-react";

const Emoji = ({
  handleEmoji,
  handleEmojiPickerClick,
  ref,
  showPicker,
  type,
  postText,
  showImageUpload
}) => {
  return (
    <div
      className={`relative z-[9999] flex items-center  ${
        postText?.length > 84 || showImageUpload ? "justify-end" : "justify-between"
      }`}
    >
      {!showImageUpload && postText?.length < 84 && (
        <img
          src="../../../icons/colorful.png"
          width={40}
          height={40}
          alt="post"
          className="cursor-pointer"
        />
      )}
      <div className="relative flex items-center justify-end hover:bg-blueColor/10 right-0 rounded-full group">
        <i
          onClick={handleEmojiPickerClick}
          className="emoji_icon_large cursor-pointer"
        ></i>
        <span
          className="absolute group-hover:block hidden -top-10 rounded-lg -left-10 font-semibold bg-black/75 px-2 py-1 text-white"
        >
          emoji
        </span>

        {showPicker && (
          <div
            ref={ref}
            className="absolute bottom-full mb-2 right-0 z-[9999] emoji-box-shadow"
            style={{ zIndex: 9999 }}
          >
            <EmojiPicker
              previewConfig={{ showPreview: false }}
              searchDisabled={true}
              onEmojiClick={handleEmoji}
              width="250px"
              height="250px"
                disableAutoFocus={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Emoji;

import React from "react";
import EmojiPicker from "emoji-picker-react";

const Emoji = ({
  handleEmoji,
  handleEmojiPickerClick,
  ref,
  showPicker,
  type,
  postText,
}) => {
  return (
    <div
      className={`flex items-center ${
        postText?.length > 84 ? "justify-end" : "justify-between "
      }`}
    >
      {postText?.length < 84 && (
        <img
          src="../../../icons/colorful.png"
          width={40}
          height={40}
          alt="post"
          className="cursor-pointer relative"
        />
      )}
      <div className="relative flex items-center justify-end hover:bg-blueColor/10   right-0 rounded-full group">
        <i
          onClick={handleEmojiPickerClick}
          className="emoji_icon_large relative cursor-pointer "
        ></i>
        <span
          className={`absolute   group-hover:block hidden -top-10 rounded-lg -left-10 font-semibold bg-black/75 px-2 py-1 text-white`}
        >
          emoji
        </span>

        {showPicker && (
          <div
            ref={ref}
            className={`fixed -top-0 -right-36 z-50 ${type==="type2"&&("-top-8 -right-36")} emoji-box-shadow`} 
          >
            <EmojiPicker
              previewConfig={{ showPreview: false }}
              searchDisabled={true}
              onEmojiClick={handleEmoji}
              width="250px"
              height="250px"
              skinTonePickerLocation="top"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Emoji;

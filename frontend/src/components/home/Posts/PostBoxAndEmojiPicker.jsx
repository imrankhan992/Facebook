import React, { useState, useRef, useEffect } from "react";
import AddToPostSection from "./AddToPostSection";
import PreviewImage from "./PreviewImage";
import Emoji from "./Emoji";

const PostBoxAndEmojiPicker = ({ user }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [postText, setPostText] = useState("");
  const pickerRef = useRef(null);
  const textAreaRef = useRef(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to auto to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to scrollHeight
    }
  }, [postText, showImageUpload]);

  const handleEmoji = ({ emoji }) => {
    const ref = textAreaRef.current;
    ref.focus();
    const start = postText.substring(0, ref.selectionStart);
    const end = postText.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setPostText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleClickOutside = (e) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(e.target) &&
      textAreaRef.current &&
      !textAreaRef.current.contains(e.target)
    ) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEmojiPickerClick = (e) => {
    e.stopPropagation();
    setShowPicker((prev) => !prev);
  };

  return (
    <div className="w-full  flex flex-col gap-2 px-2 overflow-auto ">
      <textarea
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
        placeholder={`What's on your mind, ${
          user?.first_name + " " + user?.last_name || "Guest"
        }?`}
        className={`w-full focus:outline-none  placeholder:text-2xl resize-none placeholder:text-black/65   bg-none ${
          showImageUpload
            ? "  placeholder:text-[16px] !pr-6 text-[12px] "
            : "placeholder:text-2xl min-h-32 "
        } ${
          postText.length > 84 || showImageUpload
            ? "text-[15px]"
            : "text-[24px]"
        }`}
        ref={textAreaRef}
        style={{ overflow: "auto" }} 
      />

      <div>
        {!showImageUpload && (
          <Emoji
            handleEmojiPickerClick={handleEmojiPickerClick}
            handleEmoji={handleEmoji}
            ref={pickerRef}
            showPicker={showPicker}
            type={"type1"}
            showImageUpload={showImageUpload}
            postText={postText}
          />
        )}
        {showImageUpload && (
          <>
            <Emoji
              handleEmojiPickerClick={handleEmojiPickerClick}
              handleEmoji={handleEmoji}
              ref={pickerRef}
              showPicker={showPicker}
              type={"type2"}
              showImageUpload={showImageUpload}
              postText={postText}
            />
          </>
        )}
        
      </div>
      {showImageUpload && <PreviewImage />}
      
    </div>
  );
};

export default PostBoxAndEmojiPicker;

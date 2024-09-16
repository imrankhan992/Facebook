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

  // useEffect(() => {
  //   // Adjust the height of the textarea based on its scroll height
  //   const textarea = textAreaRef.current;
  //   textarea.style.height = "auto"; // Reset the height to auto to recalculate
  //   textarea.style.height = `${textarea.scrollHeight}px`;
  // }, [postText, showImageUpload]);

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
    <div className="w-full ">
      <div className={`w-full  max-h-[300px]  flex justify-around overflow-hidden   flex-col `}>
        <textarea
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          placeholder={`What's on your mind, ${
            user?.first_name + " " + user?.last_name || "Guest"
          }?`}
          className={`w-full focus:outline-none  ${postText?.length>84 ?"overflow-y-scroll":""} placeholder:text-2xl  placeholder:text-black/65 resize-none bg-none ${
            showImageUpload
              ? "min-h-20 placeholder:text-[16px] !pr-6"
              : "placeholder:text-2xl min-h-32"
          } ${
            postText.length > 84 || showImageUpload
              ? "text-[15px]"
              : "text-[24px]"
          }`}
          ref={textAreaRef}
         
        />
        {/* {showImageUpload&&( <div  className={`  ${postText.length > 84 ? "flex items-center w-full  justify-end " : ""} `}>
        <i
          onClick={handleEmojiPickerClick}
          className={`emoji_icon_large  cursor-pointer right-0   ${postText.length > 84 ? "bottom-1.5 " : "top-1.5 absolute"} `}
        ></i>
        
        </div>) } */}

       
      </div>

     <div>
     {!showImageUpload && (
        <Emoji
          handleEmojiPickerClick={handleEmojiPickerClick}
          handleEmoji={handleEmoji}
          ref={pickerRef}
          showPicker={showPicker}
          type={"type1"}
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
            postText={postText}
          />
          <PreviewImage />
        </>
      )}
     </div>

      
    </div>
  );
};

export default PostBoxAndEmojiPicker;

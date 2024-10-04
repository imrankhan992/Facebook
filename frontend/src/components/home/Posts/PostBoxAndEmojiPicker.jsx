import React, { useState, useRef, useEffect } from "react";
import AddToPostSection from "./AddToPostSection";
import PreviewImage from "./PreviewImage";
import Emoji from "./Emoji";

const PostBoxAndEmojiPicker = ({
  user,
  showImageUpload,
  setShowImageUpload,
  selectedBg,
  setSelectedBg,
  postText,
  setPostText,
  mediaFiles,
  setMediaFiles,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const [background, setBackground] = useState(false);

  const pickerRef = useRef(null);
  const textAreaRef = useRef(null);

  const [cursorPosition, setCursorPosition] = useState();
  const bgRef = useRef(null);
  // Automatically adjust textarea height based on text length
  useEffect(() => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to auto to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to scrollHeight
    }
  }, [postText, showImageUpload]);

  // Restore cursor position after text/emoji update
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  // Handle emoji insertion
  const handleEmoji = ({ emoji }) => {
    const ref = textAreaRef.current;
    ref.focus();

    // Get the current cursor position
    const start = postText.substring(0, ref.selectionStart);
    const end = postText.substring(ref.selectionEnd); // Use selectionEnd to handle selected text
    const newText = start + emoji + end;

    setPostText(newText);

    // Set the cursor position after the emoji
    const newCursorPosition = start.length + emoji.length;
    setCursorPosition(newCursorPosition);
  };

  // Close emoji picker when clicking outside
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

  // Array of post backgrounds
  const postBackgrounds = [
    "/images/postBackgrounds/1.jpg",
    "/images/postBackgrounds/2.jpg",
    "/images/postBackgrounds/3.jpg",
    "/images/postBackgrounds/4.jpg",
    "/images/postBackgrounds/5.jpg",
    "/images/postBackgrounds/6.jpg",
    "/images/postBackgrounds/7.jpg",
    "/images/postBackgrounds/8.jpg",
    "/images/postBackgrounds/9.jpg",
  ];

  useEffect(() => {
    if (selectedBg && postText.length < 84) {
      bgRef.current.style.backgroundImage = `url(${selectedBg})`;
    } else {
      bgRef.current.style.backgroundImage = "";
      setSelectedBg("");
      setBackground(false);
    }
  }, [selectedBg, postText]);

  return (
    <div
      className="w-full justify-between flex flex-col   px-2 overflow-auto"
      ref={bgRef}
    >
      <textarea
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
        placeholder={`What's on your mind, ${
          user?.first_name + " " + user?.last_name || "Guest"
        }?`}
        className={`w-full focus:outline-none ${
          postText.length < 84 && background ? "text-center" : ""
        }  bg-transparent  placeholder:text-2xl resize-none placeholder:text-black/65 bg-none ${
          showImageUpload
            ? "placeholder:text-[16px] !pr-6 text-[12px] "
            : "placeholder:text-2xl max-h-72 min-h-60"
        } ${
          postText.length > 84 || showImageUpload
            ? "text-[15px]"
            : "text-[24px]"
        }`}
        ref={textAreaRef}
        style={{
          paddingTop: `${
            background && postText.length < 84
              ? Math.abs(textAreaRef.current.value.length * 0.1 - 23)
              : "0"
          }%`,
          overflow: "auto",
        }}
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
            background={background}
            setBackground={setBackground}
            selectedBg={selectedBg}
            setSelectedBg={setSelectedBg}
            postBackgrounds={postBackgrounds}
            bgRef={bgRef}
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
              background={background}
              setBackground={setBackground}
              selectedBg={selectedBg}
              setSelectedBg={setSelectedBg}
              postBackgrounds={postBackgrounds}
              bgRef={bgRef}
            />
          </>
        )}
      </div>
      {showImageUpload && (
        <PreviewImage
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          showImageUpload={showImageUpload}
          setShowImageUpload={setShowImageUpload}
        />
      )}
    </div>
  );
};

export default PostBoxAndEmojiPicker;

// SinglePost.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dots, Public } from "@/svg";
import { formatDistanceToNow, set } from "date-fns";
import { DynamicListContext } from "../Index";
import "./style.css";
import { ReactPopups } from "./ReactPopups";
import Comments from "../Posts/Comments/Comments";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommentsTooltip } from "../Posts/Comments/CommentsTooltip";

const SinglePost = ({ post, style, index , user }) => {
  const [openComment, setOpenComment] = useState(false)
  const textAreaRef = useRef()
  const { setSize } = useContext(DynamicListContext);
  const rowRoot = useRef(null);
  const buttonRef = useRef(null); // Ref for Like button
  const [showReact, setShowReact] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (rowRoot.current) {
      const height = rowRoot.current.getBoundingClientRect().height;
      setSize(index, height);
    }
  }, [index, setSize,showFullText]);

  const postTime = post.createdAt
    ? formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })
    : "";

  // Handle mouse enter on the Like button
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Delay showing the popup by 500ms
    timeoutRef.current = setTimeout(() => {
      setShowReact(true);
      timeoutRef.current = null;
    }, 500);
  };

  // Handle mouse leave from the Like button
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Delay hiding the popup by 500ms
    timeoutRef.current = setTimeout(() => {
      setShowReact(false);
      timeoutRef.current = null;
    }, 500);
  };

  // Function to determine if text should be truncated
  const getTextToDisplay = () => {
    if (post.text.length > 200) {
      return showFullText ? post.text : `${post.text.slice(0, 300)}...`;
    }
    return post.text;
  };
  return (
    <div
      ref={rowRoot}
      style={style}
      key={index}
      className="bg-secondaryColorBg ListItem w-full overflow-hidden flex flex-col gap-1"
    >
      <div className="w-full bg-white md:rounded-lg md:border-2">
        <div className="flex px-4 pt-4 items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={post?.user?.picture}
                alt="User Profile Picture"
              />
              <AvatarFallback>
                {post?.user?.first_name} {post?.user?.last_name}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-5">
              <h1 className="text-[16px] font-semibold"> {post?.user?.first_name} {post?.user?.last_name}</h1>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-[#6B6D71]">
                  {postTime}
                </span>
                <Public color="#828387" />
              </div>
            </div>
          </div>
          
           
            <Popover>
      <PopoverTrigger asChild>
        <div className="!p-0 !bg-none rounded-full">
          <CommentsTooltip
            img={ <Dots color="#828387" />}
            text={"Menu"}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-h-[200px] min-w-[200px] rounded-lg shadow-lg bg-white border-none">
       hello
        
      </PopoverContent>
    </Popover>
         
        </div>

        {/* Post Content */}
        {post?.background === null && (
          <div className="px-4 py-2">
            <span className="text-[15.5px] leading-6 ">
              {getTextToDisplay()}
              {post?.text.length > 200 && !showFullText && (
                <span
                  className="text-black font-semibold cursor-pointer hover:underline select-none"
                  onClick={toggleText}
                >
                  show more
                </span>
              )}
            </span>
          </div>
        )}

        {post?.background && (
          <AspectRatio ratio={16 / 10} className="bg-muted mt-2 relative">
            <span className="text-[28px] absolute flex items-center justify-center inset-0 font-bold text-white leading-8 text-center">
              {getTextToDisplay()}
            </span>
            <img
              src={post.background}
              alt="Post Background"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        )}

        {/* Post Images */}
        {post.images?.length > 0 && (
          <AspectRatio ratio={16 / 16} className="bg-muted mt-2">
            <img
              src={post.images[0].url}
              alt="Post image"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        )}

        {/* Like and Comments */}
        <div className="py-2 flex items-center justify-between px-4">
          <div>128 likes</div>
          <div className="flex items-center gap-2">
            <span>6</span>
            <i className="comment_icon"></i>
          </div>
        </div>

        {/* Like, Comment, Share Buttons */}
        <div className="grid relative grid-cols-3 mx-4 border-y py-1 border-borderColor/40">
          {/* Reactions Popup */}
          <ReactPopups
            showReact={showReact}
            setShowReact={setShowReact}
            buttonRef={buttonRef}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />

          {/* Like Button */}
          <div
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex items-center justify-center gap-2 hover:bg-secondaryColorBg cursor-pointer py-1.5 rounded-md"
          >
            <i className="like_icon"></i>
            <span className="text-textColor font-semibold">Like</span>
          </div>

          {/* Comment Button */}
          <div onClick={()=>{setOpenComment(true); textAreaRef.current.focus()}} className="flex items-center justify-center gap-2 py-1.5 hover:bg-secondaryColorBg cursor-pointer rounded-md">
            <i className="comment_icon"></i>
            <span className="text-textColor font-semibold">Comment</span>
          </div>

          {/* Share Button */}
          <div className="flex items-center justify-center gap-2 py-1.5 hover:bg-secondaryColorBg cursor-pointer rounded-md">
            <i className="share_icon"></i>
            <span className="text-textColor font-semibold">Share</span>
          </div>
        </div>
        <Comments user={user} openComment={openComment} setOpenComment={setOpenComment} textAreaRef={textAreaRef}/>
      </div>
    </div>
  );
};

export default SinglePost;

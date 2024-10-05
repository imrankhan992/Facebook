// SinglePost.jsx
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dots, Public } from "@/svg";
import React, { useContext, useEffect, useRef } from "react";
import { DynamicListContext } from "../Index";
import "./style.css";
import { formatDistanceToNow } from "date-fns";

const SinglePost = ({ post, style, index, row }) => {
  const { setSize } = useContext(DynamicListContext);
  const rowRoot = useRef(null);

  useEffect(() => {
    if (rowRoot.current) {
      const height = rowRoot.current.getBoundingClientRect().height;
      setSize(index, height);
    }
  }, [index, setSize]);
  const postTime = post.createdAt ? formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true }) : "";

  return (
    <div
      ref={rowRoot}
      style={style}
      key={index}
      className="bg-secondaryColorBg ListItem w-full overflow-hidden flex flex-col gap-1"
    >
      <div className=" w-full bg-white rounded-lg border-2">
        <div className="flex px-4 pt-4 items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={post?.user?.picture}
                alt="User Profile Picture"
              />
              <AvatarFallback>{post?.user?.first_name } {post?.user?.last_name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-5">
              <h1 className="text-[16px] font-semibold">Imran Khan</h1>
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm font-semibold text-[#6B6D71]">
                {postTime}
                </span>
                <Public color="#828387" />
              </div>
            </div>
          </div>
          <div className="hover:bg-hover2 rounded-full p-1 cursor-pointer transition-transform duration-150">
            <Dots color="#828387" />
          </div>
        </div>

        {post?.background === null && (
          <div className="px-4 py-2">
            <span className="text-[15.5px] leading-6">{post.text}</span>
          </div>
        )}

        {post?.background !== null && post?.background && (
          <div className=" ">
            <div className="flex items-center justify-between mt-2">
              <AspectRatio ratio={16 / 13} className="bg-muted mt-2 relative">
              <span className="text-[15.5px] absolute flex items-center justify-center inset-0 font-bold text-3xl text-white leading-8 text-center">{post.text}</span>
                <img
                  src={post.background}
                  alt="Post image"
                  className="h-full w-full object-cover "
                />
              </AspectRatio>
            </div>
          </div>
        )}

        {/* Show images */}
        {post.images?.length > 0 && (
          <AspectRatio ratio={16 / 16} className="bg-muted mt-2">
            <img
              src={post.images[0].url}
              alt="Post image"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        )}

        <div className="py-2  flex items-center justify-between px-4">
          <div>128 likes</div>
          <div className="flex items-center justify-center gap-2">
            <span>6</span>
            <i className="comment_icon"></i>
          </div>
        </div>
        {/* like comments */}
        <div className="grid grid-cols-3 mx-4 border-y py-1 border-borderColor/40">
          <div className="flex items-center justify-center gap-2 hover:bg-secondaryColorBg cursor-pointer py-1.5 rounded-md">
            <i className="like_icon"></i>{" "}
            <span className="text-textColor font-semibold">Like</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1.5 hover:bg-secondaryColorBg cursor-pointer rounded-md">
            <i className="comment_icon"></i>{" "}
            <span className="text-textColor font-semibold">Comment</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1.5 hover:bg-secondaryColorBg cursor-pointer rounded-md">
            <i className="share_icon"></i>{" "}
            <span className="text-textColor font-semibold">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

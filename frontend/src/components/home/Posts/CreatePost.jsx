import React from "react";
import ProfileAvatar from "./../../Header/ProfileAvatar";
import { useSelector } from "react-redux";
import { Feeling, LiveVideo, Photo } from "@/svg";
import Post from "./Post";

const CreatePost = ({style}) => {
  const user = useSelector((state) => state.user);
  return (
    <div style={style} className="w-full flex items-center justify-center mt-20 md:mt-0 md:px-[1.1rem]">
      <div className="bg-white p-2 min-w-[100%] rounded-lg border-shadow">
        <div className="flex items-center justify-start gap-3 w-full">
          <ProfileAvatar />
          <div className="lg:h-11 h-10  hover:bg-hover2  hover:cursor-pointer rounded-full w-full px-5 flex items-center justify-start gap-3 bg-secondaryColorBg">
            {/* Responsive text size using clamp */}
            
            <Post user={user}/>
          </div>
        </div>
        <div className="w-full h-[0.9px] bg-hover2 mt-2.5" />
        <div className="grid grid-cols-3 pt-3 flex-wrap">
          <div className="flex items-center justify-center gap-2 hover:bg-hover1 hover:cursor-pointer p-2 rounded-lg">
            <div style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)' }}>
              <LiveVideo color={"#E42645"}  />
            </div>
            <span className="text-textColor font-semibold" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)' }}>
              Live Video
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 hover:bg-hover1 hover:cursor-pointer p-2 rounded-lg">
            <Photo color={"#41B35D"}  />
            <span className="text-textColor font-semibold" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)' }}>
              Photo/Video
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 hover:bg-hover1 hover:cursor-pointer p-2 rounded-lg">
            <Feeling color={"#EAB026"}  />
            <span className="text-textColor font-semibold" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)' }}>
              Feeling/Activity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

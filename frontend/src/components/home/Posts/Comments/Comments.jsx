import React, { useRef, useState } from "react";
import { UserProfile } from "./UserProfile";
import { Input } from "@/components/ui/input";
import { CommentsTooltip } from "./CommentsTooltip";
import { IoIosSend } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPopover } from "./EmojiPopover";

const Comments = ({ user,openComment, setOpenComment,textAreaRef }) => {

  return (
    <div className="px-4  flex py-2 items-start justify-center gap-2 ">
      <UserProfile user={user} />
      <div className={`!w-full relative bg-secondaryColorBg  flex  items-center justify-around  rounded-2xl flex-col ${openComment?"h-[5rem]":"h-9"}`}>
        <Textarea
        onClick={()=>setOpenComment(true)}
ref={textAreaRef}
          className=" rounded-full border-none w-[98%] bg-secondaryColorBg placeholder:text-[16px]"
          placeholder={`Comment as ${user?.first_name + " " + user?.last_name}`}
        />
        <div className={` !pr-5 ${openComment?"  w-full  flex items-center justify-between gap-1 mb-1":"bg-yellow-500"}  `}>
          <div className={`px-3 flex items-center justify-between  mb-1 ${openComment?"":"absolute  top-[50%] bottom-[50%] right-0 bg-red-500"}`}>
          <EmojiPopover />
            
            <CommentsTooltip
              img={<i className="camera_icon"></i>}
              text={"Attach a photo or video"}
            />
            <CommentsTooltip
              img={<i className="gif_icon"></i>}
              text={"Comment with a GIF"}
            />
            <CommentsTooltip
              img={<i className="sticker_icon"></i>}
              text={"Comment with a Sticker"}
            />
          </div>
          <div className={ `cursor-pointer ${openComment?"flex":"hidden"}`}>
            <IoIosSend className="text-blueColor text-2xl rotate-45  "/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

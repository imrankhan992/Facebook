import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import PostBoxAndEmojiPicker from "./PostBoxAndEmojiPicker";
import AddToPostSection from "./AddToPostSection";

const Post = ({ user }) => {
 
  return (
    <Dialog >
      <DialogTrigger asChild>
        <span
          className="text-textColor break-words w-full flex items-center justify-start h-full"
          style={{ fontSize: "clamp(0.6rem, 2vw, 1.1rem)" }}
        >
          What's on your mind, {user?.first_name || "Guest"}?
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg border-shadow max-h-[80vh] ">
        <DialogHeader className="py-[1.3rem] border-b absolute w-full left-1/2 transform -translate-x-1/2 flex justify-center">
          <DialogTitle className="text-xl font-bold text-center">
            Create Post
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center flex-col gap-2 space-x-2 mt-16  ">
          {/* profile picture */}
          <div className="flex gap-2  items-center justify-start w-full ">
            <div>
              <img
                width={45}
                height={45}
                src={user?.picture}
                alt={`profile picture ${
                  user?.first_name + " " + user?.last_name
                }`}
              />
            </div>
            <div className="flex flex-col w-full h-full">
              {" "}
              {/* show user name */}
              <h3 className="font-semibold">
                {user?.first_name + " " + user?.last_name}
              </h3>
              <div className="flex gap-1 items-center justify-center  max-w-24 bg-bgColorDark px-1 rounded-lg">
                <img
                  src="../../../icons/public.png"
                  className="py-1.5"
                  alt=""
                  srcset=""
                />
                <span className="text-[13px] font-semibold">Public</span>
                <i className="arrowDown_icon"></i>
              </div>
            </div>
          </div>
          <PostBoxAndEmojiPicker user={user}/>
          {/* next part */}
              
        </div>
        <div  className="w-full gap-2 flex flex-col items-end">

              {/* add post and other icons */}
      <AddToPostSection />
              <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full bg-blueColor hover:bg-blueColor text-white font-semibold text-lg ">
              Next
            </Button>
          </DialogClose>
              </div>
      </DialogContent>
    </Dialog>
  );
};

export default Post;

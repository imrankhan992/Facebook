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
import { BeatLoader } from "react-spinners";
import React, { useState } from "react";
import PostBoxAndEmojiPicker from "./PostBoxAndEmojiPicker";
import AddToPostSection from "./AddToPostSection";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/apis/api";
import { playSuccessSound } from "@/apis/soundsApi";

const Post = ({ user }) => {
  const [showImageUpload, setShowImageUpload] = useState(true);
  // State to track the selected background
  const [selectedBg, setSelectedBg] = useState();
  const [postText, setPostText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutate, isPending, isError, error, data, isPaused, isSuccess } =
    useMutation({
      mutationKey: ["createPost"],
      mutationFn: createPost,
      onSuccess:()=>{
        setDialogOpen(false);
        playSuccessSound();
      }
    });
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <span
          className="text-textColor break-words w-full flex items-center justify-start"
          style={{ fontSize: "clamp(0.6rem, 2vw, 1.1rem)" }}
        >
          What's on your mind, {user?.first_name || "Guest"}?
        </span>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-lg  border-shadow overflow-auto ${
          showImageUpload ? "" : "hide-scrollbar "
        } max-h-[100vh] min-h-[90vh]`}
      >
        <DialogHeader className="py-[1.3rem] absolute w-full left-1/2 transform -translate-x-1/2 flex justify-center">
          <DialogTitle className="text-xl font-bold text-center">
            Create Post
          </DialogTitle>
        </DialogHeader>
        {isError && !isPending && (
          <div className="absolute z-50 bg-white/65 inset-0 flex gap-2 items-center justify-center">
            {" "}
            <div className="text-red-600">{error?.message}</div>
            <div>
              <Button
                onClick={() => {
                  mutate({
                    type: "backgroundPost",
                    text: postText,
                    images: [],
                    background: selectedBg,
                    user: user?.id,
                    token: user?.token,
                  });
                }}
                className="bg-blueColor hover:bg-blueColor transform transition-all active:scale-95 duration-150"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
        {/* profile picture */}
        <div className="flex items-end justify-end flex-col  pt-4 rounded-lg  w-full">
          <div className="flex gap-4 items-center justify-start w-full">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                width={40}
                height={40}
                src={user?.picture}
                alt={`Profile picture of ${
                  user?.first_name + " " + user?.last_name
                }`}
                className="rounded-full border border-gray-200"
              />
            </div>

            {/* User Info */}
            <div className="flex flex-col">
              {/* User Name */}
              <h3 className="font-semibold text-base text-gray-900">
                {user?.first_name + " " + user?.last_name}
              </h3>

              {/* Public Icon and Text */}
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full mt-1">
                <img
                  src="../../../icons/public.png"
                  alt="Public icon"
                  className="w-3 h-3"
                />
                <span className="text-xs font-medium text-gray-600">
                  Public
                </span>
                <i className="arrowDown_icon"></i>
              </div>
            </div>
          </div>
        </div>
        {isPaused && (
          <p className="text-red-600 ">Please Check your Internet Connection</p>
        )}
        <div className="flex items-center flex-col  overflow-auto duration-1000 hover:transition-all ">
          <PostBoxAndEmojiPicker
            user={user}
            showImageUpload={showImageUpload}
            setShowImageUpload={setShowImageUpload}
            selectedBg={selectedBg}
            setSelectedBg={setSelectedBg}
            postText={postText}
            setPostText={setPostText}
          />
        </div>
        <div className="w-full gap-2 flex flex-col items-end justify-end">
          {/* add post and other icons */}
          <AddToPostSection
            showImageUpload={showImageUpload}
            setShowImageUpload={setShowImageUpload}
          />

          <Button
            type="button"
            variant="secondary"
            className="w-full bg-blueColor hover:bg-blueColor text-white font-semibold text-lg select-none"
            disabled={isPending || postText.length === 0}
            onClick={() => {
              mutate({
                type: "backgroundPost",
                text: postText,
                images: [],
                background: selectedBg,
                user: user?.id,
                token: user?.token,
              });
            }}
          >
            {isPending ? <BeatLoader color="white" size={10} /> : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Post;

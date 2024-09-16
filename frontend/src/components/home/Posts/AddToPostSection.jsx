import { Dots, Feeling, Photo } from "@/svg";

export default function AddToPostSection() {
  return (
    <div className="flex w-full justify-between items-center border p-3.5 shadow-sm rounded-lg border-borderColor/40 ">
      <div className="addto_text font-semibold">Add to your post</div>
    <div className="flex  items-center justify-center">


    <div
        className="hover:bg-secondaryColorBg p-2 rounded-full flex items-center justify-center cursor-pointer "
        
      >
        <Photo color="#45bd62" />
      </div>
      <div className="hover:bg-secondaryColorBg p-2 rounded-full flex items-center justify-center cursor-pointer  ">
        <i className="tag_icon"></i>
      </div>
      <div className="hover:bg-secondaryColorBg p-2 rounded-full flex items-center justify-center cursor-pointer  ">
        <Feeling color="#f7b928" />
      </div>
      <div className="hover:bg-secondaryColorBg p-2 rounded-full flex items-center justify-center cursor-pointer  ">
        <i className="maps_icon"></i>
      </div>
      <div className="hover:bg-secondaryColorBg p-2 rounded-full flex items-center justify-center cursor-pointer  ">
        <i className="microphone_icon"></i>
      </div>
      <div className="hover:bg-secondaryColorBg p-2 rounded-full flex items-center justify-center cursor-pointer  ">
        <Dots color="#65676b" />
      </div>
    </div>
    </div>
  );
}

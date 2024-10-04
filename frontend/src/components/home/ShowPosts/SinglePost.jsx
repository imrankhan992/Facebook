import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dots, Public } from "@/svg";
import React, { useContext, useEffect, useRef } from "react";
import { DynamicListContext } from "../Index";
import "./style.css"
const SinglePost = ({ post ,style,index}) => {
  const { setSize } = useContext(DynamicListContext);
  const rowRoot = useRef(null);

  useEffect(() => {
    if (rowRoot.current) {
      setSize(index, rowRoot.current.getBoundingClientRect().height);
    }
  }, [index, setSize]);
  return (
     <div
     ref={rowRoot}
       style={style}

        key={index}
        className="bg-secondaryColorBg ListItem  w-full overflow-hidden   flex flex-col gap-1"
      >
        
       <div className=" p-4 w-full  bg-white !rounded-lg   border-2">
       <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsdBTmaoL7qGrR-umNZsidCXgLpEzpfV4_EA&s"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col  leading-5">
              <h1 className="text-[16px] font-semibold">Imran Khan</h1>
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm font-semibold text-[#6B6D71]">
                  about an hour ago.
                </span>
                <Public color="#828387" />
              </div>
            </div>
          </div>
          <div className="hover:bg-hover2 rounded-full p-1 cursor-pointer transition-transform duration-150">
            <Dots color="#828387" />
          </div>
        </div>

        <div className="">
          <span className="text-[15.5px] leading-6">{post.text}</span>
        </div>

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
        <div className="">
          like comment share
        </div>
       </div>
      
      </div>
  );
};

export default SinglePost;

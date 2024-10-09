
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommentsTooltip } from "./CommentsTooltip";
import EmojiPicker from "emoji-picker-react";

export function EmojiPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="!p-0 !bg-none rounded-full">
          <CommentsTooltip
            img={<i className="emoji_icon"></i>}
            text={"Insert an emoji"}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px] h-[300px] rounded-lg shadow-lg bg-white border-none">
       
        <EmojiPicker
          previewConfig={{ showPreview: false }}
          searchDisabled={true}
          width="100%"  
          height="100%" 
          disableAutoFocus={true}
          emojiStyle="Facebook"
          className="!border-none"
        />
      </PopoverContent>
    </Popover>
  );
}

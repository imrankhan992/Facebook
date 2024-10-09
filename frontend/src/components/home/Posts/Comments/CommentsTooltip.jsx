import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CommentsTooltip({img,text}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          
          <div className='w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-secondaryColor2 hover:border rounded-full'>{img} </div>
        </TooltipTrigger>
       <TooltipContent className="bg-black/80">
          <p className="text-white ">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

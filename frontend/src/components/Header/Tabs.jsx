import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function HeaderTabs() {
  const [activeTab, setActiveTab] = useState("Home");
  const data = [
    {
      toolTipValue: "Home",
      icons: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide my-1  lucide-house w-5 h-5 lg:h-6 lg:w-6 ${
            activeTab === "Home" ? "text-[#0866ff]" : ""
          }  `}
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.526l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
      value: "Home",
    },
    {
      toolTipValue: "Video",
      icons: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide my-1  lucide-tv-minimal-play w-5 h-5 lg:h-6 lg:w-6 ${
            activeTab === "Video" ? "text-[#0866ff]" : ""
          }  `}
        >
          <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z" />
          <path d="M7 21h10" />
          <rect width="20" height="14" x="2" y="3" rx="2" />
        </svg>
      ),
      value: "Video",
    },
    {
      toolTipValue: "MarketPlace",
      icons: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide my-1  lucide-store w-5 h-5 lg:h-6 lg:w-6 ${
            activeTab === "MarketPlace" ? "text-[#0866ff]" : ""
          }  `}
        >
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
          <path d="M2 7h20" />
          <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
        </svg>
      ),
      value: "MarketPlace",
    },
    {
      toolTipValue: "Groups",
      icons: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`lucide my-1  lucide-store w-5 h-5 lg:h-6 lg:w-6 ${
            activeTab === "Groups" ? "text-[#0866ff]" : ""
          }  `}
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-users"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      value: "Groups",
    },
  ];
  return (
    <TooltipProvider>
      <Tabs
        defaultValue="home"
        className="flex items-center  overflow-hidden order-3  w-full lg:w-auto lg:order-none justify-between"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="flex w-full lg:gap-8  items-center bg-transparent justify-between  lg:h-14  ">
          {data.map((item, index) => (
            <Tooltip  key={index}>
              <TooltipTrigger>
                <TabsTrigger
                 
                  value={item.value}
                  className={
                    activeTab === item.value
                      ? "border-b-2 border-[#0866ff] lg:mt-1 lg:py-2 rounded-none !shadow-none lg:px-14 "
                      : "lg:px-14 hover:bg-secondaryColorBg rounded-xl "
                  }
                >
                  {item.icons}
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent className="bg-black opacity-70">
                <p className="text-white">{item.toolTipValue}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TabsList>
      
      </Tabs>
    </TooltipProvider>
  );
}

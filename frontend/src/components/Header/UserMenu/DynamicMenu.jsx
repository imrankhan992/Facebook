import { menuConfig } from "./menuConfig";

export const DynamicMenu = ({
  currentMenu,
  navigateTo,
  goBack,
  currentLabel,
  direction,
}) => (
  <div
    className={direction === "forward" ? "right_side" : "left_side"}
  >
    <div>
      {currentMenu !== "main" && (
        <div className="flex items-center justify-start gap-3 pb-4 ">
          <button
            onClick={goBack}
            className="hover:bg-secondaryColorBg w-9 h-9 rounded-full flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color=""
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">
            {currentLabel[currentLabel.length - 1]}
          </h1>
        </div>
      )}

      <ul>
        {menuConfig[currentMenu]?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigateTo(item.action, item.label, item?.link);
            }}
            className="relative flex items-center gap-3 hover:bg-secondaryColorBg p-2 rounded-md cursor-pointer "
          >
            <div className="flex items-center w-10 h-10 rounded-full bg-[#D8DADF] justify-center ">
              <i className={item.icon}></i>
            </div>
            <div>
              <div className="font-semibold text-[16.5px] text-black">
                {item.label}
              </div>
            </div>
            {menuConfig[item.action] && (
              <div className="absolute right-2">
                <i className="right_icon"></i>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
    <div />
  </div>
);

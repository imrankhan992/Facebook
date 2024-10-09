const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "wow",
    image: "../../../reacts/wow.gif",
  },
  {
    name: "sad",
    image: "../../../reacts/sad.gif",
  },
 
  {
    name: "angry",
    image: "../../../reacts/angry.gif",
  },
];

export const ReactPopups = ({
  showReact,
  handleMouseLeave,
  handleMouseEnter,
}) => {
  return (
    <>
      {showReact && (
        <div
          className={`absolute  bg-secondaryColor2 rounded-full p-1 react-popup-shadow -top-[2.5rem]  left-0 z-10  ${
            showReact ? "flex" : "hidden"
          }`}
          
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full rounded-md">
            <div className="flex items-center gap-1  animate-slide-up-fade-in">
              {reactsArray.map((react, i) => (
                <img
                  key={i}
                  src={react.image}
                  alt={react.name}
                  className="w-10 h-10 rounded-full cursor-pointer hover:scale-125 transition-all duration-200"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

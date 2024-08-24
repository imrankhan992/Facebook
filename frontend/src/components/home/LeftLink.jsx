export default function LeftLink({ img, text, notification }) {
  return (
    <div className=" flex gap-2 items-center hover:bg-hover2 rounded-md p-2">
      <img src={`../../../left/${img}.png`} alt="" width={30} height={30} />
      {notification !== undefined ? (
        <div className="flex items-start justify-center flex-col">
          <div className="font-semibold text-[14.5px]">{text}</div>
          <div className="text-xs">{notification}</div>
        </div>
      ) : (
        <span  className="font-semibold text-[14.5px]">{text}</span>
      )}
    </div>
  );
}

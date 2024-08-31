import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const StoriesAvatar = () => {
  const user = useSelector((state) => state.user);
  const initials = user?.first_name?.charAt(0) + user?.last_name?.charAt(0);

  return (
    <Avatar className="w-10 h-10 absolute top-3 left-2 z-40 border-4 border-blueColor ">
      <AvatarImage src={user?.picture} alt="@Your profile" />
      <AvatarFallback>{initials || "User"}</AvatarFallback>
    </Avatar>
  );
};

export default StoriesAvatar;

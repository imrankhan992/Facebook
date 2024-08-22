import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const ProfileAvatar = () => {
  const user = useSelector((state) => state.user);
  return (
    <Avatar  className="w-7 h-7">
      <AvatarImage src={`${user?.picture}`} alt="@Your profile" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;

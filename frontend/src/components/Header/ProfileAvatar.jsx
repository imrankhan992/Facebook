import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const ProfileAvatar = () => {
  const user = useSelector((state) => state.user);
  const initials = user?.first_name?.charAt(0) + user?.last_name?.charAt(0);

  return (
    <Avatar className="w-11 h-11">
      <AvatarImage src={user?.picture} alt="@Your profile" />
      <AvatarFallback>{initials || "User"}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;

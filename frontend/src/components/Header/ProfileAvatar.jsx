import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileAvatar = () => {
  return (
    <Avatar>
      <AvatarImage
        src="https://avatar.iran.liara.run/public/boy"
        alt="@Your profile"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;

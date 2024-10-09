import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function UserProfile({user}) {
    return (
      <Avatar className="h-9 w-9">
        <AvatarImage  src={user?.picture} alt={user?.first_name} />
        <AvatarFallback>{user?.first_name} {user?.last_name}</AvatarFallback>
      </Avatar>
    )
  }
  
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { routesPath } from "@/constants/routes-path";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { useLogoutHooks } from "@/hooks/users/user-logout";
import { handleError } from "@/helpers/handle-error";

import Image from "next/image";
import { RootState } from "@/store/store";

const UserDropdown: React.FC = () => {
  const { mutate } = useLogoutHooks();
  const userData = useSelector((state: RootState) => state?.userDetail);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        dispatch(clearUser());
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("user");
        router.push(routesPath.home);
        toast.error(Messages.logout.success);
      },
      onError: handleError,
    });
  };

  const handleDashboard = () => {
    router.push(routesPath.userDashboard);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="h-8 w-8 rounded-full overflow-hidden relative">
          <Image
            src={userData?.profilePic?.url || "/user.jpg"}
            alt="Profile picture"
            fill
            sizes="32px "
            className="object-cover border p-1 border-black rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleDashboard}>
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

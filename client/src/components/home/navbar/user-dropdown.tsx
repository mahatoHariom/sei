"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { routesPath } from "@/constants/routes-path";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { useLogoutHooks } from "@/hooks/users/user-logout";
import { handleError } from "@/helpers/handle-error";
// import useLogout from "@/helpers/handle-logout";

const UserDropdown: React.FC = () => {
  const { mutate } = useLogoutHooks();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        dispatch(clearUser());
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("user");
        router.push(routesPath.login);
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
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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

import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/userSlice";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { routesPath } from "@/constants/routes-path";
// import { useRouter } from "next/router"; // If you are using Next.js for routing

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //   const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push(routesPath.login);
    toast.error(Messages.logout.success);

    // router.push("/login");
  };

  return handleLogout;
};

export default useLogout;

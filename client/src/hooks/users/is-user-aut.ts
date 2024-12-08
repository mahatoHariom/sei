import { openModal } from "@/store/slices/modalSlice";
import { ModalContentKey } from "@/types/modal-keys";
import { useDispatch } from "react-redux";

// Hook to handle the "not logged in" scenario
export const useHandleNotLoggedIn = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(
      openModal({
        title: "Login",
        description: "Login to your account",
        contentKey: ModalContentKey.LoginForm,
        isOpen: true,
      })
    );
  };
};

export const useCallHandleNotLoggedIn = () => {
  const handleNotLoggedIn = useHandleNotLoggedIn();

  return () => {
    handleNotLoggedIn();
  };
};

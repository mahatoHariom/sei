import { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
  message?: string;
}

export const handleError = (error: Error | AxiosError): void => {
  console.error("Error occurred:", error);

  if ((error as AxiosError).response) {
    const axiosError = error as AxiosError<ErrorResponse>;

    const errorMessage =
      axiosError.response?.data?.message || "Something went wrong";

    toast.error(` ${errorMessage}`);
  } else {
    toast.error("Network error. Please try again later.");
  }
};

import { toast } from "react-toastify";

const options = {
  autoClose: 2000,
  position: "top-center",
};

export const Notify = {
  success: (message = "Saved successfully") => {
    toast.success(message, options);
  },
  error: () => {
    toast.error("Failed. Please try again", options);
  },
};

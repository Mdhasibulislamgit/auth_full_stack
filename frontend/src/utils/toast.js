import { toast } from "react-toastify";

export const showSuccessToast = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    className: "bg-green-50 text-green-600 border border-green-300",
  });
};

export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    className: "bg-red-50 text-red-600 border border-red-300",
  });
};
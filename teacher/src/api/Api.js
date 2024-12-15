import axios from "axios";
import iziToast from "izitoast";

const API_URL = process.env.REACT_APP_BASEURL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    // Show success toast for successful operations
    if (response.data?.success && !response.config?.disableToast) {
      iziToast.success({
        title: "Berhasil",
        message: response.data?.message,
        position: "topRight",
        timeout: 3000,
        transitionIn: "bounceInLeft",
        transitionOut: "fadeOutRight",
        titleColor: "#000",
        messageColor: "#666",
        iconColor: "#2ecc71",
      });
    }
    return response;
  },
  (error) => {
    // Show error toast for failed operations
    if (!error.config?.disableToast) {
      iziToast.error({
        title: "Gagal",
        message: error.response?.data?.message,
        color: "red",
        titleColor: "black",
        messageColor: "gray",
        icon: "fa fa-ban",
        iconColor: "black",
      });
    }

    // Handle unauthorized access
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;

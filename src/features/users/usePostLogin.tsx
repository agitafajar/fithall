import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type FormData = {
  email: string;
  password: string;
};

export const usePostLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: { token: string; user: {} }) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const productsResponse = await axiosInstance.post("/login", body);
      return productsResponse;
    },
    onSuccess: (data: AxiosResponse) => {
      const { token, user } = data.data;
      onSuccess({ token, user });
      Cookies.set("token", token);
      Cookies.set("is-guest", "false");
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("is-guest", false.toString());
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      console.error("Mutation failed", error);
    },
  });
};

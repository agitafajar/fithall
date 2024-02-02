import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axiosInstance } from "@/lib/axios";

type FormData = {
  email: string;
  password: string;
};

export const usePostUser = ({
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
      localStorage.setItem("token", token);
      localStorage.setItem("is-guest", false.toString());
      console.log("datalist", data.data);
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      console.error("Mutation failed", error);
    },
  });
};

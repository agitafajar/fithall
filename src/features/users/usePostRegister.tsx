import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

type FormData = {
  email: string;
  password: string;
  name: string;
};

export const usePostRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: { error: string; message: string }) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const productsResponse = await axiosInstance.post("/users", body);
      return productsResponse;
    },
    onSuccess: (data: AxiosResponse) => {
      const { token, user } = data.data;
      onSuccess({ error: token, message: user });
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

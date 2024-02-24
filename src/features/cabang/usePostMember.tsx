import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

type FormData = {
  start_member: string;
  jadwal: Array<{ hari: number; jam: string; lapangan_id: number }> | [];
  durasi: number;
};

export const usePostMember = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const productsResponse = await axiosInstance.post(
        "/member/generate-cart",
        body
      );
      return productsResponse;
    },
    onSuccess: (data: AxiosResponse) => {
      onSuccess(data);
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      console.error("Mutation failed", error);
    },
  });
};

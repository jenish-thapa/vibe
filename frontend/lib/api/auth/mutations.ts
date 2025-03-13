import { axiosPrivate } from "@/axios_config/axiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signUp = async (data: any) => {
  const response = await axiosPrivate.post(`/api/auth/signup`, data);
  return response.data;
};

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    mutationKey: ["signup"],
    onSuccess: (response) => {
      if (response) {
        toast.success("User signed up successfully!");
        router.push("/chats");
      } else {
        toast.error("Signup failed! Please try again");
      }
    },
    onError: (data: any) => {
    //   console.log(data.response?.data?.error);
      toast.error(data.response?.data?.error);
    },
  });
};

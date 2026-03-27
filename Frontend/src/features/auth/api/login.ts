import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import storage from "utils/storage";
import { CREDS_KEY, getCreds, useCreds } from "./creds";

type LoginDTO = {
  data: {
    username: string;
    password: string;
  };
};

type LoginResponse = {
  creds: any;
  token: any;
  // creds: Creds;
};

export async function login({ data }: LoginDTO) {
  const res = await axios.post<LoginResponse>("/login", data);

  const token = res.data.token;
  const creds = res.data.creds;

  // const res = {
  //   data: {
  //     creds: {
  //       username: "",
  //       password: "",
  //     },
  //     token:
  //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEYXJ1bCBJbnFpbGFiaSBCYWNrZW5kIiwiYXVkIjoiUG9uZG9rIFBlc2FudHJlbiBEYXJ1bCBJbnFpbGFiaSIsInN1YiI6IkpXVCBEYXJ1bCBJbnFpbGFiaSIsImlhdCI6MTY4NDk4MjUxNCwiZXhwIjoxNjg1MDA0MTE0LCJ1c2VybmFtZSI6Impva28ifQ.JAX1xswX_mfJNDHoFCITFXDO-8uMFNmzYEXeZrVCuLM",
  //   },
  // };

  // return res.data;
  return { creds, token };
}

type UseLoginOption = {
  config?: MutationConfig<typeof login>;
};

export function useLogin({ config }: UseLoginOption = {}) {
  return useMutation(login, {
    onSuccess: ({ creds, token }) => {
      queryClient.setQueryData([CREDS_KEY], creds);
      storage.setToken(token);
    },
    ...config,
  });
}

import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import storage from "utils/storage";
import { Creds } from "../types";

export const CREDS_KEY = "creds";

export type CredsResponse = {
  creds: Creds;
  token: string;
};

export async function getCreds() {
  const res = await axios.get<CredsResponse>("/me");

  return res.data;
}

export async function loadCreds() {
  if (!storage.getToken()) return null;
  // const data = {
  //   creds: {
  //     id_user: "",
  //     username: "diaken",
  //     role: "",
  //   },
  //   token:
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEYXJ1bCBJbnFpbGFiaSBCYWNrZW5kIiwiYXVkIjoiUG9uZG9rIFBlc2FudHJlbiBEYXJ1bCBJbnFpbGFiaSIsInN1YiI6IkpXVCBEYXJ1bCBJbnFpbGFiaSIsImlhdCI6MTY4NDk4MjUxNCwiZXhwIjoxNjg1MDA0MTE0LCJ1c2VybmFtZSI6Impva28ifQ.JAX1xswX_mfJNDHoFCITFXDO-8uMFNmzYEXeZrVCuLM",
  // };

  const { creds, token } = await getCreds();

  // return data.creds;
  return creds;
}

export function useCreds() {
  return useQuery([CREDS_KEY], loadCreds, {
    onError: () => {
      storage.clearToken();
    },
  });
}

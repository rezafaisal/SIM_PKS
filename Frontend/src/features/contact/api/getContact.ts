import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getContacts() {
  const res = await axios.get("/contact");

  // return data;
  return res.data;
}

type QueryFnType = typeof getContacts;

type UseContactsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useContacts({ config }: UseContactsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });
}

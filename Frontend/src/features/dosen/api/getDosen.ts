import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getDosens() {
  const res = await axios.get("/dosen");

  return res.data;
}

type QueryFnType = typeof getDosens;

type UseDosensOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useDosens({ config }: UseDosensOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["dosens"],
    queryFn: () => getDosens(),
  });
}

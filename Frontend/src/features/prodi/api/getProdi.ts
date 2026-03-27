import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getProdis() {
  const res = await axios.get("/prodi");

  return res.data;
}

type QueryFnType = typeof getProdis;

type UseProdisOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useProdis({ config }: UseProdisOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["prodis"],
    queryFn: () => getProdis(),
  });
}

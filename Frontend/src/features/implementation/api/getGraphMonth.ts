import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getGraphMonth({ params }: any = {}) {
  const res = await axios.get("/implementation/graphmonth", { params });

  // return data;
  return res.data;
}

type QueryFnType = typeof getGraphMonth;

type UseGraphMonthOptions = {
  params?: any;
  config?: QueryConfig<QueryFnType>;
};

export function useGraphMonth({ params, config }: UseGraphMonthOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["graphMonthImplementation", params],
    queryFn: () => getGraphMonth({ params }),
  });
}

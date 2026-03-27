import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getCollaborationGraphMonths({
  valueYear,
  regionSet,
}: any) {
  const res = await axios.get(
    `/cooperation/graphmonth/${dayjs(valueYear).format("YYYY")}/${regionSet}`
  );

  // return data;
  return res.data;
}

type QueryFnType = typeof getCollaborationGraphMonths;

type UseCollaborationGraphMonthsOptions = {
  valueYear?: string | number;
  regionSet?: string;
  config?: QueryConfig<QueryFnType>;
};

export function useCollaborationGraphMonths({
  valueYear,
  regionSet,
  config,
}: UseCollaborationGraphMonthsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["collaborationGraphMonths", valueYear + "/" + regionSet],
    queryFn: () => getCollaborationGraphMonths({ valueYear, regionSet }),
  });
}

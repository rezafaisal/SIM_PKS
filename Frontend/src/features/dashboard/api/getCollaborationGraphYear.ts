import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getCollaborationGraphYears({
  valueYear,
  regionSet,
}: any) {
  const res = await axios.get(
    `/cooperation/graphyear/${dayjs(valueYear).format("YYYY")}/${regionSet}`
  );

  // return data;
  return res.data;
}

type QueryFnType = typeof getCollaborationGraphYears;

type UseCollaborationGraphYearsOptions = {
  valueYear?: string | number;
  regionSet?: string;
  config?: QueryConfig<QueryFnType>;
};

export function useCollaborationGraphYears({
  valueYear,
  regionSet,
  config,
}: UseCollaborationGraphYearsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["collaborationGraphYears", valueYear + "/" + regionSet],
    queryFn: () => getCollaborationGraphYears({ valueYear, regionSet }),
  });
}

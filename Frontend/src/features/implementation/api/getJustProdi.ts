import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

export async function getJustProdi({ creds }: any) {
  if (creds.level.name == "Admin") {
    const res = await axios.get(`/cooperation/justprodi`);
    return res.data;
  } else {
    const res = await axios.get(`/cooperation/justprodi/${creds.level.id}`);
    return res.data;
  }

  // return data;
}

type QueryFnType = typeof getJustProdi;

type UseJustProdiOptions = {
  creds?: string | number;
  config?: QueryConfig<QueryFnType>;
};

export function useJustProdi({ creds, config }: UseJustProdiOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["justProdi", creds],
    queryFn: () => getJustProdi({ creds }),
  });
}

import { useQuery } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

type ShowFacultyDTO = {
  facultyValue: any;
};

export async function getFacultyAlls({ facultyValue }: ShowFacultyDTO) {
  if (facultyValue == -1) {
    return null;
  }
  const res = await axios.get(`/faculty/show/${facultyValue}`);

  // return data;
  return res.data;
}

type QueryFnType = typeof getFacultyAlls;

type UseFacultyAllsOptions = {
  facultyValue?: number | string;
  config?: QueryConfig<QueryFnType>;
};

export function useFacultyAlls({
  facultyValue,
  config,
}: UseFacultyAllsOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["facultyAlls", facultyValue],
    queryFn: () => getFacultyAlls({ facultyValue }),
  });
}

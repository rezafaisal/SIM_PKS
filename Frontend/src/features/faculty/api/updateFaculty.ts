import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateFacultyDTO = {
  id: string;
  data: {
    id: number;
    name: string;
  };
};

type UpdateFacultyResponse = {
  message: string;
};

export async function updateFaculty({ id, data }: UpdateFacultyDTO) {
  const res = await axios.put<UpdateFacultyResponse>(`/faculty/${id}`, data);

  return res.data;
}

type UseUpdateFacultyOptions = {
  config?: MutationConfig<typeof updateFaculty>;
};

export function useUpdateFaculty({ config }: UseUpdateFacultyOptions = {}) {
  return useMutation(updateFaculty, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["facultys"]);
      showNotification({
        message: args[0].message,
        color: "green",
        icon: IconCheck({}),
      });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}

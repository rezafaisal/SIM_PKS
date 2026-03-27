import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteFacultyDTO = {
  id: number;
};

type DeleteFacultyResponse = {
  message: string;
};

export async function deleteFaculty({ id }: DeleteFacultyDTO) {
  const res = await axios.delete<DeleteFacultyResponse>(`/faculty/${id}`);

  return res.data;
}

type UseDeleteFacultyOptions = {
  config?: MutationConfig<typeof deleteFaculty>;
};

export function useDeleteFaculty({ config }: UseDeleteFacultyOptions = {}) {
  return useMutation(deleteFaculty, {
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
    onError: (...args) => {
      showNotification({
        message: args[0].message,
        color: "red",
        icon: IconX({}),
      });
    },
  });
}

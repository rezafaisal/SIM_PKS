import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteTypeDTO = {
  id: number;
};

type DeleteTypeResponse = {
  message: string;
};

export async function deleteType({ id }: DeleteTypeDTO) {
  const res = await axios.delete<DeleteTypeResponse>(`/type/${id}`);

  return res.data;
}

type UseDeleteTypeOptions = {
  config?: MutationConfig<typeof deleteType>;
};

export function useDeleteType({ config }: UseDeleteTypeOptions = {}) {
  return useMutation(deleteType, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["types"]);
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

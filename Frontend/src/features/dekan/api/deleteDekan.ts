import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteDekanDTO = {
  id: number;
};

type DeleteDekanResponse = {
  message: string;
};

export async function deleteDekan({ id }: DeleteDekanDTO) {
  const res = await axios.delete<DeleteDekanResponse>(`/dean/${id}`);

  return res.data;
}

type UseDeleteDekanOptions = {
  config?: MutationConfig<typeof deleteDekan>;
};

export function useDeleteDekan({ config }: UseDeleteDekanOptions = {}) {
  return useMutation(deleteDekan, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["dekans"]);
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

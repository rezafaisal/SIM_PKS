import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateDekanDTO = {
  id: string | number;
  data: {
    id: number;
    name: string;
    nip: string;
    position: string;
    faculty: string;
    period: [Date | null, Date | null];
  };
};

type UpdateDekanResponse = {
  message: string;
};

export async function updateDekan({ id, data }: UpdateDekanDTO) {
  const res = await axios.put<UpdateDekanResponse>(`/dean/${id}`, data);

  return res.data;
}

type UseUpdateDekanOptions = {
  config?: MutationConfig<typeof updateDekan>;
};

export function useUpdateDekan({ config }: UseUpdateDekanOptions = {}) {
  return useMutation(updateDekan, {
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
  });
}

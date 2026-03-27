import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type ActiveDekanDTO = {
  id: number;
};

type ActiveDekanResponse = {
  message: string;
};

export async function activeDekan({ id }: ActiveDekanDTO) {
  const res = await axios.put<ActiveDekanResponse>(`/dean/status/${id}`);

  return res.data;
}

type UseActiveDekanOptions = {
  config?: MutationConfig<typeof activeDekan>;
};

export function useActiveDekan({ config }: UseActiveDekanOptions = {}) {
  return useMutation(activeDekan, {
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

import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateDekanDTO = {
  data: {
    name: string;
    nip: string;
    position: string;
    faculty: number;
    period: [Date | null, Date | null];
  };
};

type CreateDekanResponse = {
  message: string;
};

export async function createDekan({ data }: CreateDekanDTO) {
  const res = await axios.post<CreateDekanResponse>("/dean", data);

  return res.data;
}

type UseCreateDekanOptions = {
  config?: MutationConfig<typeof createDekan>;
};

export function useCreateDekan({ config }: UseCreateDekanOptions = {}) {
  return useMutation(createDekan, {
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

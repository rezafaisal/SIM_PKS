import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateTypeDTO = {
  data: {
    name: string;
  };
};

type CreateTypeResponse = {
  message: string;
};

export async function createType({ data }: CreateTypeDTO) {
  const res = await axios.post<CreateTypeResponse>("/type", data);

  return res.data;
}

type UseCreateTypeOptions = {
  config?: MutationConfig<typeof createType>;
};

export function useCreateType({ config }: UseCreateTypeOptions = {}) {
  return useMutation(createType, {
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
  });
}

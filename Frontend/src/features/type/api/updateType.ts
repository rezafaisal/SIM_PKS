import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateTypeDTO = {
  id: string;
  data: {
    id: number;
    name: string;
  };
};

type UpdateTypeResponse = {
  message: string;
};

export async function updateType({ id, data }: UpdateTypeDTO) {
  const res = await axios.put<UpdateTypeResponse>(`/type/${id}`, data);

  return res.data;
}

type UseUpdateTypeOptions = {
  config?: MutationConfig<typeof updateType>;
};

export function useUpdateType({ config }: UseUpdateTypeOptions = {}) {
  return useMutation(updateType, {
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

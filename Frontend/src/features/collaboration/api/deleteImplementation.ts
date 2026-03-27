import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteImplementationDTO = {
  id: number;
};

type DeleteImplementationResponse = {
  message: string;
};

export async function deleteImplementation({ id }: DeleteImplementationDTO) {
  const res = await axios.delete<DeleteImplementationResponse>(
    `/implementation/${id}`
  );

  return res.data;
}

type UseDeleteImplementationOptions = {
  config?: MutationConfig<typeof deleteImplementation>;
};

export function useDeleteImplementation({
  config,
}: UseDeleteImplementationOptions = {}) {
  return useMutation(deleteImplementation, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["ByIdcollaborations"]);
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

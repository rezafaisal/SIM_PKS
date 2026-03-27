import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteDocumentationDTO = {
  id: number;
};

type DeleteDocumentationResponse = {
  message: string;
};

export async function deleteDocumentation({ id }: DeleteDocumentationDTO) {
  const res = await axios.delete<DeleteDocumentationResponse>(
    `/documentation/${id}`
  );

  return res.data;
}

type UseDeleteDocumentationOptions = {
  config?: MutationConfig<typeof deleteDocumentation>;
};

export function useDeleteDocumentation({
  config,
}: UseDeleteDocumentationOptions = {}) {
  return useMutation(deleteDocumentation, {
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

import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteCollaborationDTO = {
  id: number;
};

type DeleteCollaborationResponse = {
  message: string;
};

export async function deleteCollaboration({ id }: DeleteCollaborationDTO) {
  const res = await axios.delete<DeleteCollaborationResponse>(
    `/cooperation/${id}`
  );

  return res.data;
}

type UseDeleteCollaborationOptions = {
  config?: MutationConfig<typeof deleteCollaboration>;
};

export function useDeleteCollaboration({
  config,
}: UseDeleteCollaborationOptions = {}) {
  return useMutation(deleteCollaboration, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["collaborations"]);
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

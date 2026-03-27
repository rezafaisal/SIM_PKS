import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteOrganizationDTO = {
  id: number;
};

type DeleteOrganizationResponse = {
  message: string;
};

export async function deleteOrganization({ id }: DeleteOrganizationDTO) {
  const res = await axios.delete<DeleteOrganizationResponse>(
    `/organization/${id}`
  );

  return res.data;
}

type UseDeleteOrganizationOptions = {
  config?: MutationConfig<typeof deleteOrganization>;
};

export function useDeleteOrganization({
  config,
}: UseDeleteOrganizationOptions = {}) {
  return useMutation(deleteOrganization, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["organizations"]);
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

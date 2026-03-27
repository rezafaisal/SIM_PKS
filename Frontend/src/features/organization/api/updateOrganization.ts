import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateOrganizationDTO = {
  id: string;
  data: {
    id: number;
    name: string;
    id_parent: any;
  };
};

type UpdateOrganizationResponse = {
  message: string;
};

export async function updateOrganization({ id, data }: UpdateOrganizationDTO) {
  const res = await axios.put<UpdateOrganizationResponse>(
    `/organization/${id}`,
    data
  );

  return res.data;
}

type UseUpdateOrganizationOptions = {
  config?: MutationConfig<typeof updateOrganization>;
};

export function useUpdateOrganization({
  config,
}: UseUpdateOrganizationOptions = {}) {
  return useMutation(updateOrganization, {
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
  });
}

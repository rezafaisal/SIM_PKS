import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateOrganizationDTO = {
  data: {
    name: string;
    id_parent: number | null;
  };
};

type CreateOrganizationResponse = {
  message: string;
};

export async function createOrganization({ data }: CreateOrganizationDTO) {
  const res = await axios.post<CreateOrganizationResponse>(
    "/organization",
    data
  );

  return res.data;
}

type UseCreateOrganizationOptions = {
  config?: MutationConfig<typeof createOrganization>;
};

export function useCreateOrganization({
  config,
}: UseCreateOrganizationOptions = {}) {
  return useMutation(createOrganization, {
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

import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateRoleDTO = {
  data: {
    name: string;
    access_page: string;
  };
};

type CreateRoleResponse = {
  message: string;
};

export async function createRole({ data }: CreateRoleDTO) {
  const res = await axios.post<CreateRoleResponse>("/roles", data);

  return res.data;
}

type UseCreateRoleOptions = {
  config?: MutationConfig<typeof createRole>;
};

export function useCreateRole({ config }: UseCreateRoleOptions = {}) {
  return useMutation(createRole, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["roles"]);
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

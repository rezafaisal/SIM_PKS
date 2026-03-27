import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteRoleDTO = {
  id: number;
};

type DeleteRoleResponse = {
  message: string;
};

export async function deleteRole({ id }: DeleteRoleDTO) {
  const res = await axios.delete<DeleteRoleResponse>(`/roles/${id}`);

  return res.data;
}

type UseDeleteRoleOptions = {
  config?: MutationConfig<typeof deleteRole>;
};

export function useDeleteRole({ config }: UseDeleteRoleOptions = {}) {
  return useMutation(deleteRole, {
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

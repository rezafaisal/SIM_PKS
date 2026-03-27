import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateRoleDTO = {
  roleId: number;
  data: {
    id: number;
    name: string;
    access_page: any;
  };
};

type UpdateRoleResponse = {
  message: string;
};

export async function updateRole({ roleId, data }: UpdateRoleDTO) {
  const res = await axios.put<UpdateRoleResponse>(`/roles/${roleId}`, data);

  return res.data;
}

type UseUpdateRoleOptions = {
  config?: MutationConfig<typeof updateRole>;
};

export function useUpdateRole({ config }: UseUpdateRoleOptions = {}) {
  return useMutation(updateRole, {
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

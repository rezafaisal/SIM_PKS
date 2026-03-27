import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteUserDTO = {
  id: number;
};

type DeleteUserResponse = {
  message: string;
};

export async function deleteUser({ id }: DeleteUserDTO) {
  const res = await axios.delete<DeleteUserResponse>(`/user/${id}`);

  return res.data;
}

type UseDeleteUserOptions = {
  config?: MutationConfig<typeof deleteUser>;
};

export function useDeleteUser({ config }: UseDeleteUserOptions = {}) {
  return useMutation(deleteUser, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["users"]);
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

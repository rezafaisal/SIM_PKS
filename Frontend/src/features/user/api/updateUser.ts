import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateUserDTO = {
  id: number;
  data: {
    id: number;
    username: string;
    role: string[];
    prodi: string;
  };
};

type UpdateUserResponse = {
  message: string;
};

export async function updateUser({ id, data }: UpdateUserDTO) {
  const res = await axios.put<UpdateUserResponse>(`/user/${id}`, data);

  return res.data;
}

type UseUpdateUserOptions = {
  config?: MutationConfig<typeof updateUser>;
};

export function useUpdateUser({ config }: UseUpdateUserOptions = {}) {
  return useMutation(updateUser, {
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

import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateUserDTO = {
  data: {
    username: string;
    password: string;
    prodi: string;
    role: string[];
  };
};

type CreateUserResponse = {
  message: string;
};

export async function createUser({ data }: CreateUserDTO) {
  const res = await axios.post<CreateUserResponse>("/user", data);

  return res.data;
}

type UseCreateUserOptions = {
  config?: MutationConfig<typeof createUser>;
};

export function useCreateUser({ config }: UseCreateUserOptions = {}) {
  return useMutation(createUser, {
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

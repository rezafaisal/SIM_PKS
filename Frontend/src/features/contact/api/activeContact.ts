import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type ActiveContactDTO = {
  id: number;
};

type ActiveContactResponse = {
  message: string;
};

export async function activeContact({ id }: ActiveContactDTO) {
  const res = await axios.put<ActiveContactResponse>(`/contact/status/${id}`);

  return res.data;
}

type UseActiveContactOptions = {
  config?: MutationConfig<typeof activeContact>;
};

export function useActiveContact({ config }: UseActiveContactOptions = {}) {
  return useMutation(activeContact, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["contacts"]);
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

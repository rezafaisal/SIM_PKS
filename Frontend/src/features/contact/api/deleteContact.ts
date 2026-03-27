import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteContactDTO = {
  id: number;
};

type DeleteContactResponse = {
  message: string;
};

export async function deleteContact({ id }: DeleteContactDTO) {
  const res = await axios.delete<DeleteContactResponse>(`/contact/${id}`);

  return res.data;
}

type UseDeleteContactOptions = {
  config?: MutationConfig<typeof deleteContact>;
};

export function useDeleteContact({ config }: UseDeleteContactOptions = {}) {
  return useMutation(deleteContact, {
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
    onError: (...args) => {
      showNotification({
        message: args[0].message,
        color: "red",
        icon: IconX({}),
      });
    },
  });
}

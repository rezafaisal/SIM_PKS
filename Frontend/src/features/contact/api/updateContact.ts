import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateContactDTO = {
  id: string | number;
  data: {
    id: number;
    name: string;
    nip: string;
    faculty: string;
    position: string;
    address: string;
    handphoneNo: string;
    email: string;
  };
};

type UpdateContactResponse = {
  message: string;
};

export async function updateContact({ id, data }: UpdateContactDTO) {
  const res = await axios.put<UpdateContactResponse>(`/contact/${id}`, data);

  return res.data;
}

type UseUpdateContactOptions = {
  config?: MutationConfig<typeof updateContact>;
};

export function useUpdateContact({ config }: UseUpdateContactOptions = {}) {
  return useMutation(updateContact, {
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

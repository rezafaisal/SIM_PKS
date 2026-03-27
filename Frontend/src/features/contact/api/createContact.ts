import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateContactDTO = {
  data: {
    name: string;
    nip: string;
    faculty: number | null;
    position: string;
    address: string;
    handphoneNo: string;
    email: string;
  };
};

type CreateContactResponse = {
  message: string;
};

export async function createContact({ data }: CreateContactDTO) {
  const res = await axios.post<CreateContactResponse>("/contact", data);

  return res.data;
}

type UseCreateContactOptions = {
  config?: MutationConfig<typeof createContact>;
};

export function useCreateContact({ config }: UseCreateContactOptions = {}) {
  return useMutation(createContact, {
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

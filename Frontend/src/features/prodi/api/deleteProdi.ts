import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteProdiDTO = {
  id: number;
};

type DeleteProdiResponse = {
  message: string;
};

export async function deleteProdi({ id }: DeleteProdiDTO) {
  const res = await axios.delete<DeleteProdiResponse>(`/prodi/${id}`);

  return res.data;
}

type UseDeleteProdiOptions = {
  config?: MutationConfig<typeof deleteProdi>;
};

export function useDeleteProdi({ config }: UseDeleteProdiOptions = {}) {
  return useMutation(deleteProdi, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["prodis"]);
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

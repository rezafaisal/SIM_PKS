import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

type DeleteDosenDTO = {
  id: number;
};

type DeleteDosenResponse = {
  message: string;
};

export async function deleteDosen({ id }: DeleteDosenDTO) {
  const res = await axios.delete<DeleteDosenResponse>(`/dosen/${id}`);

  return res.data;
}

type UseDeleteDosenOptions = {
  config?: MutationConfig<typeof deleteDosen>;
};

export function useDeleteDosen({ config }: UseDeleteDosenOptions = {}) {
  return useMutation(deleteDosen, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["dosens"]);
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

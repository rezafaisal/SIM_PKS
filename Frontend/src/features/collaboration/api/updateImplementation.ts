import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateImplementationDTO = {
  implementationname: string;
  data: {
    id: number;
    nama: string;
    judul: string;
    jenis: string;
    bukti: string;
  };
};

type UpdateImplementationResponse = {
  message: string;
};

export async function updateImplementation({
  implementationname,
  data,
}: UpdateImplementationDTO) {
  const res = await axios.patch<UpdateImplementationResponse>(
    `/implementation/${implementationname}`,
    data
  );

  return res.data;
}

type UseUpdateImplementationOptions = {
  config?: MutationConfig<typeof updateImplementation>;
};

export function useUpdateImplementation({
  config,
}: UseUpdateImplementationOptions = {}) {
  return useMutation(updateImplementation, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["implementations"]);
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

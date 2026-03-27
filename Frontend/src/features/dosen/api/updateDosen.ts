import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateDosenDTO = {
  id: string;
  data: {
    id: number;
    name: string;
    id_organization: any;
    nip: any;
    address: any;
    contact: any;
  };
};

type UpdateDosenResponse = {
  message: string;
};

export async function updateDosen({ id, data }: UpdateDosenDTO) {
  const res = await axios.put<UpdateDosenResponse>(`/dosen/${id}`, data);

  return res.data;
}

type UseUpdateDosenOptions = {
  config?: MutationConfig<typeof updateDosen>;
};

export function useUpdateDosen({ config }: UseUpdateDosenOptions = {}) {
  return useMutation(updateDosen, {
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
  });
}

import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateProdiDTO = {
  id: string;
  data: {
    id: number;
    name: string;
    id_faculty: any;
  };
};

type UpdateProdiResponse = {
  message: string;
};

export async function updateProdi({ id, data }: UpdateProdiDTO) {
  const res = await axios.put<UpdateProdiResponse>(`/prodi/${id}`, data);

  return res.data;
}

type UseUpdateProdiOptions = {
  config?: MutationConfig<typeof updateProdi>;
};

export function useUpdateProdi({ config }: UseUpdateProdiOptions = {}) {
  return useMutation(updateProdi, {
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
  });
}

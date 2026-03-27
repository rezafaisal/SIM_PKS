import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateDosenDTO = {
  data: {
    name: string;
    id_organization: number | null;
    nip: string;
    address: string;
    contact: string;
  };
};

type CreateDosenResponse = {
  message: string;
};

export async function createDosen({ data }: CreateDosenDTO) {
  const res = await axios.post<CreateDosenResponse>("/dosen", data);

  return res.data;
}

type UseCreateDosenOptions = {
  config?: MutationConfig<typeof createDosen>;
};

export function useCreateDosen({ config }: UseCreateDosenOptions = {}) {
  return useMutation(createDosen, {
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

import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateProdiDTO = {
  data: {
    name: string;
    id_faculty: number | null;
  };
};

type CreateProdiResponse = {
  message: string;
};

export async function createProdi({ data }: CreateProdiDTO) {
  const res = await axios.post<CreateProdiResponse>("/prodi", data);

  return res.data;
}

type UseCreateProdiOptions = {
  config?: MutationConfig<typeof createProdi>;
};

export function useCreateProdi({ config }: UseCreateProdiOptions = {}) {
  return useMutation(createProdi, {
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

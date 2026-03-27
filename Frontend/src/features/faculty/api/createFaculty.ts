import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateFacultyDTO = {
  data: {
    name: string;
  };
};

type CreateFacultyResponse = {
  message: string;
};

export async function createFaculty({ data }: CreateFacultyDTO) {
  const res = await axios.post<CreateFacultyResponse>("/faculty", data);

  return res.data;
}

type UseCreateFacultyOptions = {
  config?: MutationConfig<typeof createFaculty>;
};

export function useCreateFaculty({ config }: UseCreateFacultyOptions = {}) {
  return useMutation(createFaculty, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["facultys"]);
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

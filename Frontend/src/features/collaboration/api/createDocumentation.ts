import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateDocumentationDTO = {
  data: {
    name: string;
    title: string;
    type: string;
    file_image: any;
  };
  id: any;
};

type CreateDocumentationResponse = {
  message: string;
};

export async function createDocumentation({
  data,
  id,
}: CreateDocumentationDTO) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("title", data.title);
  formData.append("type", data.type);
  formData.append("file_image", data.file_image, data.file_image.name);

  const res = await axios.post<CreateDocumentationResponse>(
    `/documentation/${id}`,
    formData
  );

  return res.data;
}

type UseCreateDocumentationOptions = {
  config?: MutationConfig<typeof createDocumentation>;
};

export function useCreateDocumentation({
  config,
}: UseCreateDocumentationOptions = {}) {
  return useMutation(createDocumentation, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["ByIdcollaborations"]);
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

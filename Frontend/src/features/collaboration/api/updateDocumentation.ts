import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateDocumentationDTO = {
  idDocumentation: any;
  idCollaboration: any;
  data: {
    id: number;
    name: string;
    title: string;
    type: string;
    file_image: any;
  };
};

type UpdateDocumentationResponse = {
  message: string;
};

export async function updateDocumentation({
  idDocumentation,
  idCollaboration,
  data,
}: UpdateDocumentationDTO) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("title", data.title);
  formData.append("type", data.type);
  data.file_image
    ? formData.append("file_image", data.file_image, data.file_image.name)
    : "";
  const res = await axios.post<UpdateDocumentationResponse>(
    `/documentation/${idDocumentation}/${idCollaboration}`,
    formData
  );

  return res.data;
}

type UseUpdateDocumentationOptions = {
  config?: MutationConfig<typeof updateDocumentation>;
};

export function useUpdateDocumentation({
  config,
}: UseUpdateDocumentationOptions = {}) {
  return useMutation(updateDocumentation, {
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

import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateImplementationDTO = {
  data: {
    name: string;
    prodi: any;
    createdDate: any;
    attachment: string;
    attachment_file: any;
  };
  id: any;
};

type CreateImplementationResponse = {
  message: string;
};

export async function createImplementation({
  data,
  id,
}: CreateImplementationDTO) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("attachment", data.attachment);
  formData.append(
    "createdDate",
    dayjs(data.createdDate).format("YYYY-MM-DD HH:mm:ss")
  );
  formData.append("prodi", data.prodi);

  data.attachment_file
    ? formData.append(
        "attachment_file",
        data.attachment_file,
        data.attachment_file.name
      )
    : "";
  console.log(data.createdDate);
  const res = await axios.post<CreateImplementationResponse>(
    `/implementation/${id}`,
    formData
  );

  return res.data;
}

type UseCreateImplementationOptions = {
  config?: MutationConfig<typeof createImplementation>;
};

export function useCreateImplementation({
  config,
}: UseCreateImplementationOptions = {}) {
  return useMutation(createImplementation, {
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

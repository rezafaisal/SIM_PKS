import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type CreateCollaborationDTO = {
  data: {
    title: string;
    createdDate: Date | null;
    expiredDate: Date | null;
    region: string;
    facultyName: string | number;
    scope: string;
    deanName: string | number;
    contactName: string | number;
    prodi: string | number[];
    partner_name: string;
    letterNo1: string;
    letterNo2: string;
    signatory_name: string;
    signatory_position: string;
    contact_name: string;
    contact_position: string;
    contact_handphone_no: string;
    contact_address: string;
    contact_email: string;
  };
};

type CreateCollaborationResponse = {
  message: string;
};

export async function createCollaboration({ data }: CreateCollaborationDTO) {
  const res = await axios.post<CreateCollaborationResponse>(
    "/cooperation",
    data
  );

  return res.data;
}

type UseCreateCollaborationOptions = {
  config?: MutationConfig<typeof createCollaboration>;
};

export function useCreateCollaboration({
  config,
}: UseCreateCollaborationOptions = {}) {
  return useMutation(createCollaboration, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["collaborations"]);
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

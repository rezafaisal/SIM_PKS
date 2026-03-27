import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export type UpdateCollaborationDTO = {
  id: string | number;
  data: {
    title: string;
    expiredDate: Date | null;
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

type UpdateCollaborationResponse = {
  message: string;
};

export async function updateCollaboration({
  id,
  data,
}: UpdateCollaborationDTO) {
  const res = await axios.put<UpdateCollaborationResponse>(
    `/cooperation/${id}`,
    data
  );

  return res.data;
}

type UseUpdateCollaborationOptions = {
  config?: MutationConfig<typeof updateCollaboration>;
};

export function useUpdateCollaboration({
  config,
}: UseUpdateCollaborationOptions = {}) {
  return useMutation(updateCollaboration, {
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

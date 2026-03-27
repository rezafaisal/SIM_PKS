import { Button, FileInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { CreateDocumentationDTO, useCreateDocumentation } from "../../api";
import { IconFolders } from "@tabler/icons";
import { useMemo } from "react";

interface Props {
  onSuccess: VoidFunction;
  idCollab: any;
  dataType: any;
}

const CollaborationDocumentationCreateForm: React.FC<Props> = ({
  onSuccess,
  idCollab,
  dataType,
}) => {
  const form = useForm<CreateDocumentationDTO["data"]>({
    initialValues: {
      name: "",
      title: "",
      type: "",
      file_image: "",
    },
  });

  const { mutateAsync, isLoading } = useCreateDocumentation({
    config: {
      onError({ response }) {
        form.setErrors((response?.data as any).errors);
      },
      onSuccess() {
        closeAllModals();
        onSuccess();
      },
    },
  });

  const types = useMemo(() => {
    return (dataType ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataType]);

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({ data: values, id: idCollab });
  });

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0">
        <TextInput
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Nama
            </div>
          }
          variant="filled"
          name="name"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Judul
            </div>
          }
          variant="filled"
          name="title"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("title")}
        />
        <Select
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Jenis
            </div>
          }
          variant="filled"
          name="jenis"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          data={types}
          required
          {...form.getInputProps("type")}
        />

        <FileInput
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Bukti implementasi
            </div>
          }
          rightSection={<IconFolders className="text-[#00000060]" />}
          variant="filled"
          name="file"
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          className="max-w-sm"
          required
          {...form.getInputProps("file_image")}
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => closeAllModals()}
          loading={isLoading}
        >
          Tutup
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default CollaborationDocumentationCreateForm;

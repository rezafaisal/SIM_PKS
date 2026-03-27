import { Button, FileInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { UpdateDocumentationDTO, useUpdateDocumentation } from "../../api";
import { IconFolders } from "@tabler/icons";
import { useMemo } from "react";

interface Props {
  documentation: {
    id: number;
    name: string;
    title: string;
    type: {
      id: string;
      name: string;
    };
    file_image: string;
  };
  onSuccess: VoidFunction;
  idCollab: any;
  dataType: any;
}

const CollaborationDocumentationUpdateForm: React.FC<Props> = ({
  documentation,
  onSuccess,
  idCollab,
  dataType,
}) => {
  const form = useForm<UpdateDocumentationDTO["data"]>({
    initialValues: {
      id: documentation.id,
      name: documentation.name,
      title: documentation.title,
      type: documentation.type.id,
      file_image: "",
    },
  });
  const { mutateAsync, isLoading } = useUpdateDocumentation({
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

  const handleSubmit = form.onSubmit(async (data) => {
    await mutateAsync({
      idDocumentation: documentation.id,
      idCollaboration: idCollab,
      data: {
        ...data,
      },
    });
  });

  const types = useMemo(() => {
    return (dataType ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataType]);

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0">
        <TextInput
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Nama Mitra
            </div>
          }
          variant="filled"
          name="mitra"
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
          name="mitra"
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
          description="Jika tidak ingin mengganti gambar, tidak perlu masukkan gambar"
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("file_image")}
        />
        {form.values.file_image ? (
          <></>
        ) : (
          <img
            className="rounded-lg h-36 w-auto mt-2 shadow-md bg-gray-200 "
            src={documentation.file_image}
            alt=""
          />
        )}
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
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

export default CollaborationDocumentationUpdateForm;

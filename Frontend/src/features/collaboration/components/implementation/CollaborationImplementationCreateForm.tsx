import { Button, FileInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { CreateImplementationDTO, useCreateImplementation } from "../../api";
import { IconFolders } from "@tabler/icons";
import { useEffect, useMemo, useState } from "react";
import { DateInput } from "@mantine/dates";

interface Props {
  onSuccess: VoidFunction;
  idCollab: any;
  dataProdi: any;
}

const CollaborationImplementationCreateForm: React.FC<Props> = ({
  onSuccess,
  dataProdi,
  idCollab,
}) => {
  const [type, setType] = useState<any>("");
  const form = useForm<CreateImplementationDTO["data"]>({
    initialValues: {
      name: "",
      prodi: "",
      createdDate: null,
      attachment: "",
      attachment_file: "",
    },
  });

  useEffect(() => {
    if (type) {
      if (type == "Link") {
        form.setValues({ attachment: "" });
        form.setValues({ attachment_file: "" });
      } else {
        form.setValues({ attachment: "File" });
      }
    }
  }, [type]);

  const { mutateAsync, isLoading } = useCreateImplementation({
    config: {
      onError({ response }) {
        form.setErrors((response?.data as any).messages);
      },
      onSuccess() {
        closeAllModals();
        onSuccess();
      },
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({ data: values, id: idCollab });
  });

  const prodi = useMemo(() => {
    return (dataProdi ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataProdi]);

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 mb-16"> 
        <TextInput
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Nama Implementasi
            </div>
          }
          variant="filled"
          description="Jika akunnya untuk super admin maka pilih tidak, akan tetapi jika akun ini untuk prodi maka pilih iya"
          name="name"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("name")}
        />
        <DateInput
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Tanggal Implementasi Dibuat
            </div>
          }
          variant="filled"
          name="createdDate"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          {...form.getInputProps("createdDate")}
        />
        {/*  */}
        <div>
          <Select
            label={<div>Prodi</div>}
            data={prodi}
            variant="filled"
            name="prody"
            withAsterisk={false}
            styles={{
              input: { borderColor: "#00000035", background: "#F9F9F9CC" },
            }}
            {...form.getInputProps("prodi")}
          />
        </div>
        {/*  */}

        <Select
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Jenis Lampiran
            </div>
          }
          data={["File", "Link"]}
          variant="filled"
          name="title"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          onChange={setType}
        />
        {type == "" ? (
          <div></div>
        ) : type == "Link" ? (
          <TextInput
            label={
              <div className="font-medium text-[13px] pb-1 text-[#111111]">
                Link Google Drive
              </div>
            }
            variant="filled"
            name="link"
            placeholder=""
            withAsterisk={false}
            styles={{
              input: { borderColor: "#00000035", background: "#F9F9F9CC" },
            }}
            required
            {...form.getInputProps("attachment")}
          />
        ) : (
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
            required
            {...form.getInputProps("attachment_file")}
          />
        )}
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

export default CollaborationImplementationCreateForm;

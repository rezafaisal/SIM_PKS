import { Button, FileInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { CreateImplementationDTO, useCreateImplementation } from "../api";
import { IconFolders } from "@tabler/icons";
import { useEffect, useMemo, useState } from "react";
import { DateInput } from "@mantine/dates";

interface Props {
  onSuccess: VoidFunction;
  data: any;
  dataCoop: any;
  levelStatus: any;
}

const ImplementationCreateForm: React.FC<Props> = ({
  onSuccess,
  dataCoop,
  data,
  levelStatus,
}) => {
  const [type, setType] = useState<any>("");
  const [idCollab, setIdCollab] = useState<any>("");
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

  useEffect(() => {
    if (levelStatus.name == "Admin") {
      form.setValues({ prodi: "" });
    } else {
      form.setValues({ prodi: levelStatus.id });
    }
  }, [idCollab]);

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

  const titleCooperation = useMemo(() => {
    return (dataCoop ?? []).map(({ title, id }: any) => ({
      label: title,
      value: id,
    }));
  }, [dataCoop]);

  const prodi = useMemo(() => {
    return (
      levelStatus?.name == "Admin"
        ? idCollab == ""
          ? []
          : dataCoop.find((item: any) => item.id == idCollab)?.prodi
        : data.prodi ?? []
    ).map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
  }, [dataCoop, titleCooperation, idCollab]);

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
          name="name"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("name")}
        />
        <Select
          label={
            <div className="font-medium text-[13px] pb-1 text-[#111111]">
              Judul PKS
            </div>
          }
          variant="filled"
          name="name"
          data={titleCooperation}
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          searchable
          onChange={setIdCollab}
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
            disabled={
              levelStatus.name == "Admin"
                ? idCollab == ""
                  ? true
                  : false
                : false
            }
            variant="filled"
            name="prody"
            withAsterisk={false}
            required
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

export default ImplementationCreateForm;

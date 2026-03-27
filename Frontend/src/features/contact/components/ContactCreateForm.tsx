import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { CreateContactDTO, useCreateContact } from "../api";
import { useMemo } from "react";

interface Props {
  onSuccess: VoidFunction;
  dataFaculty: any;
}

const ContactCreateForm: React.FC<Props> = ({ onSuccess, dataFaculty }) => {
  const form = useForm<CreateContactDTO["data"]>({
    initialValues: {
      name: "",
      nip: "",
      faculty: null,
      position: "",
      address: "",
      handphoneNo: "",
      email: "",
    },
  });
  const { mutateAsync, isLoading } = useCreateContact({
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

  const faculty = useMemo(() => {
    return (dataFaculty ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataFaculty]);

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({ data: values });
  });

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 pb-5">
        <TextInput
          label={<div>Nama Penghubung</div>}
          variant="filled"
          name="namaPenghubung"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label={<div>NIP</div>}
          variant="filled"
          name="nip"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("nip")}
        />
        <TextInput
          label={<div>Jabatan</div>}
          variant="filled"
          name="jabatan"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("position")}
        />
        <TextInput
          label={<div>Alamat</div>}
          variant="filled"
          name="alamat"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("address")}
        />
        <Select
          label={<div>Fakultas</div>}
          variant="filled"
          name="fakultas"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          data={faculty}
          required
          {...form.getInputProps("faculty")}
        />
        <TextInput
          label={<div>Kontak</div>}
          variant="filled"
          name="kontak"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("handphoneNo")}
        />
        <TextInput
          label={<div>Email</div>}
          variant="filled"
          name="email"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("email")}
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

export default ContactCreateForm;

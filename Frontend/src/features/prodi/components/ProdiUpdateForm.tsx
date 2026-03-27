import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { UpdateProdiDTO, useUpdateProdi } from "../api";
import { useMemo } from "react";

interface Props {
  prodi: {
    id: any;
    name: string;
    faculty: any;
  };
  onSuccess: VoidFunction;
  dataFaculty: any;
}

const ProdiUpdateForm: React.FC<Props> = ({
  prodi,
  onSuccess,
  dataFaculty,
}) => {
  const form = useForm<UpdateProdiDTO["data"]>({
    initialValues: {
      id: prodi.id,
      name: prodi.name,
      id_faculty: prodi.faculty.id,
    },
  });
  const { mutateAsync, isLoading } = useUpdateProdi({
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

  const handleSubmit = form.onSubmit(async (data) => {
    await mutateAsync({
      id: prodi.id,
      data: {
        ...data,
      },
    });
  });

  const faculty = useMemo(() => {
    return (dataFaculty ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataFaculty]);

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 pb-16">
        <TextInput
          label={<div>Fakultas</div>}
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
          {...form.getInputProps("id_faculty")}
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
          className="bg-orange-400 hover:bg-orange-500"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default ProdiUpdateForm;

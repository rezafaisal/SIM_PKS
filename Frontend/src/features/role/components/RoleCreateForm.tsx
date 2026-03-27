import { Button, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { CreateRoleDTO, useCreateRole } from "../api";
import { useMemo } from "react";

interface Props {
  onSuccess: VoidFunction;
  dataPages: any;
}

const CollaborationRoleCreateForm: React.FC<Props> = ({
  onSuccess,
  dataPages,
}) => {
  const form = useForm<CreateRoleDTO["data"]>({
    initialValues: {
      name: "",
      access_page: "",
    },
  });

  const pages = useMemo(() => {
    return (dataPages ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataPages]);

  const { mutateAsync, isLoading } = useCreateRole({
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
    console.log(values);

    await mutateAsync({ data: values });
  });

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 pb-16">
        <TextInput
          label={<div>Nama Role</div>}
          variant="filled"
          name="role"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("name")}
        />
        <MultiSelect
          label={<div>Halaman Bisa Diakses</div>}
          description="Bisa Dipilh Lebih dari 1"
          data={pages}
          clearable
          dropdownPosition="bottom"
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          {...form.getInputProps("access_page")}
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

export default CollaborationRoleCreateForm;

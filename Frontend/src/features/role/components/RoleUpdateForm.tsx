import { Button, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { UpdateRoleDTO, useUpdateRole } from "../api";
import { useMemo } from "react";

interface Props {
  role: { id: number; name: string; access_pages: any };
  dataPages: any;
  onSuccess: VoidFunction;
}

const RoleUpdateForm: React.FC<Props> = ({ role, dataPages, onSuccess }) => {
  const form = useForm<UpdateRoleDTO["data"]>({
    initialValues: {
      id: role.id,
      name: role.name,
      access_page: role.access_pages.map((pageName: string) => {
        const page = dataPages.find((page: any) => page.name === pageName);
        return page ? page.id : null;
      }),
    },
  });

  const { mutateAsync, isLoading } = useUpdateRole({
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

  const pages = useMemo(() => {
    return (dataPages ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataPages]);

  const handleSubmit = form.onSubmit(async (data) => {
    await mutateAsync({
      roleId: role.id,
      data: {
        ...data,
      },
    });
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

export default RoleUpdateForm;

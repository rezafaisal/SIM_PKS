import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { UpdateFacultyDTO, useUpdateFaculty } from "../api";

interface Props {
  faculty: {
    id: any;
    name: string;
    prodi_names: string[];
  };
  onSuccess: VoidFunction;
}

const FacultyUpdateForm: React.FC<Props> = ({ faculty, onSuccess }) => {
  const form = useForm<UpdateFacultyDTO["data"]>({
    initialValues: {
      id: faculty.id,
      name: faculty.name,
    },
  });
  const { mutateAsync, isLoading } = useUpdateFaculty({
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
      id: faculty.id,
      data: {
        ...data,
      },
    });
  });

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 pb-5">
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

export default FacultyUpdateForm;

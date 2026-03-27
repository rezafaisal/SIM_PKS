import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { UpdateDekanDTO, useUpdateDekan } from "../api";
import { YearPickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons";
import { useMemo, useState } from "react";

interface Props {
  dekan: {
    id: number;
    name: string;
    nip: string;
    position: string;
    faculty_id: string;
    period: [string, string];
  };
  onSuccess: VoidFunction;
  dataFaculty: any;
}

const DekanUpdateForm: React.FC<Props> = ({
  dekan,
  onSuccess,
  dataFaculty,
}) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(dekan.period[0]),
    new Date(dekan.period[1]),
  ]);
  const form = useForm<UpdateDekanDTO["data"]>({
    initialValues: {
      id: dekan.id,
      name: dekan.name,
      nip: dekan.nip,
      position: dekan.position,
      faculty: dekan.faculty_id,
      period: [new Date(dekan.period[0]), new Date(dekan.period[1])],
    },
  });

  const { mutateAsync, isLoading } = useUpdateDekan({
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

  const handleSubmit = form.onSubmit(async (data) => {
    await mutateAsync({
      id: dekan.id,
      data: {
        ...data,
        period: value,
      },
    });
  });

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 pb-16">
        <TextInput
          label={<div>Nama Dekan</div>}
          variant="filled"
          name="namaRektor"
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
        <Select
          label={<div>Fakultas</div>}
          variant="filled"
          name="fakultas"
          placeholder=""
          withAsterisk={false}
          data={faculty}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("faculty")}
        />
        <YearPickerInput
          label={<div>Periode</div>}
          type="range"
          rightSection={<IconCalendar className="opacity-60" />}
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          value={value}
          onChange={setValue}
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

export default DekanUpdateForm;

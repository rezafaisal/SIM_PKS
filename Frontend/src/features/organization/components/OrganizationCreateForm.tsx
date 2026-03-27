import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import {
  CreateOrganizationDTO,
  useCreateOrganization,
  useOrganizationLevels,
} from "../api";
import { useEffect, useMemo, useState } from "react";

interface Props {
  onSuccess: VoidFunction;
}

const OrganizationCreateForm: React.FC<Props> = ({ onSuccess }) => {
  const form = useForm<CreateOrganizationDTO["data"]>({
    initialValues: {
      name: "",
      id_parent: null,
    },
  });

  const { data: dataLevel, isLoading: isLoadingLevel } =
    useOrganizationLevels();

  const [levelInput, setLevelInput] = useState<string | null>("");
  const [parentLevel, setParentLevel] = useState<string | null>("");

  const { mutateAsync, isLoading } = useCreateOrganization({
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

  const dataFaculty =
    parentLevel != ""
      ? dataLevel.filter((item: any) => item.id == parentLevel)[0].children
      : [];

  const univData = useMemo(() => {
    return (dataLevel ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataLevel]);

  const univSelect = useMemo(() => {
    return (dataFaculty ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataFaculty]);

  useEffect(() => {
    setParentLevel("");
    form.setValues({ id_parent: null });
  }, [levelInput]);

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({ data: values });
  });

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 pb-16">
        <TextInput
          label={<div>Nama Organisasi</div>}
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
          label={<div>Tingkat</div>}
          variant="filled"
          name="level"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          data={[
            { value: "1", label: "Universitas" },
            { value: "2", label: "Fakultas" },
            { value: "3", label: "Prodi" },
          ]}
          value={levelInput}
          onChange={setLevelInput}
        />

        {levelInput == "2" ? (
          <Select
            label={<div>Dari Universitas</div>}
            variant="filled"
            name="level"
            placeholder=""
            withAsterisk={false}
            styles={{
              input: { borderColor: "#00000035", background: "#F9F9F9CC" },
            }}
            required
            data={univData}
            {...form.getInputProps("id_parent")}
          />
        ) : levelInput == "3" ? (
          <>
            <Select
              label={<div>Dari Universitas</div>}
              variant="filled"
              name="level"
              placeholder=""
              withAsterisk={false}
              styles={{
                input: { borderColor: "#00000035", background: "#F9F9F9CC" },
              }}
              required
              data={univData}
              value={parentLevel}
              onChange={setParentLevel}
            />
            <Select
              label={<div>Dari Fakultas</div>}
              variant="filled"
              name="level"
              placeholder=""
              withAsterisk={false}
              styles={{
                input: { borderColor: "#00000035", background: "#F9F9F9CC" },
              }}
              required
              data={univSelect}
              {...form.getInputProps("id_parent")}
            />
          </>
        ) : (
          ""
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
          className="bg-orange-400 hover:bg-orange-500"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default OrganizationCreateForm;

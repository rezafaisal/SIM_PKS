import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import {
  UpdateOrganizationDTO,
  useOrganizationLevels,
  useUpdateOrganization,
} from "../api";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  organization: {
    id: any;
    id_parent: any;
    name: string;
    children: any;
    level: any;
  };
  onSuccess: VoidFunction;
}

const OrganizationUpdateForm: React.FC<Props> = ({
  organization,
  onSuccess,
}) => {
  const form = useForm<UpdateOrganizationDTO["data"]>({
    initialValues: {
      id: organization.id,
      id_parent: organization.id_parent,
      name: organization.name,
    },
  });

  const { data: dataLevel, isLoading: isLoadingLevel } =
    useOrganizationLevels();

  const [levelInput, setLevelInput] = useState<string | null>(
    organization.level.toString()
  );
  const [parentLevel, setParentLevel] = useState<string | null>("");

  const { mutateAsync, isLoading } = useUpdateOrganization({
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
      id: organization.id,
      data: {
        ...data,
      },
    });
  });

  // const dataFaculty =
  //   parentLevel != ""
  //     ? dataLevel.filter((item: any) => item.id == parentLevel)[0].children
  //     : [];

  const dataFaculty = parentLevel
    ? dataLevel.find((item: any) => item.id === parentLevel)?.children || []
    : [];

  const univData = useMemo(() => {
    return (dataLevel ?? [])
      .filter(({ id }: any) => id !== organization.id) // Exclude current org ID
      .map(({ name, id }: any) => ({
        label: name,
        value: id,
      }));
  }, [dataLevel, organization.id]);

  const univSelect = useMemo(() => {
    return (dataFaculty ?? [])
      .filter(({ id }: any) => id !== organization.id) // Exclude current org ID
      .map(({ name, id }: any) => ({
        label: name,
        value: id,
      }));
  }, [dataFaculty, organization.id]);

  useEffect(() => {
    if (organization.level.toString() == levelInput) {
      form.setValues({ id_parent: organization.id_parent });
    } else {
      setParentLevel("");
      form.setValues({ id_parent: null });
    }
  }, [levelInput]);

  useEffect(() => {
    if (organization.level.toString() === "3") {
      const parentOrg = dataLevel.find((item: any) =>
        item.children.some((child: any) => child.id === organization.id_parent)
      );
      setParentLevel(parentOrg?.id.toString() || "");
      form.setFieldValue("id_parent", organization.id_parent);
    }
  }, []);

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

export default OrganizationUpdateForm;

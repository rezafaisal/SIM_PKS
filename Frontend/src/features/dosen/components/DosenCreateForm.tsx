import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { CreateDosenDTO, useCreateDosen } from "../api";
import { useEffect, useMemo, useState } from "react";
import { useOrganizationLevels } from "features/organization";

interface Props {
  onSuccess: VoidFunction;
}

const DosenCreateForm: React.FC<Props> = ({ onSuccess }) => {
  const form = useForm<CreateDosenDTO["data"]>({
    initialValues: {
      name: "",
      id_organization: null,
      nip: "",
      address: "",
      contact: "",
    },
  });

  const { data: organizationsData, isLoading: isLoadingLevel } =
    useOrganizationLevels();

  const { mutateAsync, isLoading } = useCreateDosen({
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
    await mutateAsync({ data: values });
  });

  const universitasOptions = useMemo(
    () =>
      organizationsData?.map((org: any) => ({
        value: org.id,
        label: org.name,
      })) || [],
    [organizationsData]
  );

  const [selectedUniversitas, setSelectedUniversitas] = useState<string | null>(
    null
  );
  const [selectedFakultas, setSelectedFakultas] = useState<string | null>(null);

  const fakultasOptions = useMemo(() => {
    if (!selectedUniversitas) return [];
    const universitas = organizationsData?.find(
      (org: any) => org.id === selectedUniversitas
    );
    return (
      universitas?.children.map((child: any) => ({
        value: child.id,
        label: child.name,
      })) || []
    );
  }, [selectedUniversitas, organizationsData]);

  const prodiOptions = useMemo(() => {
    if (!selectedFakultas) return [];
    const fakultas = organizationsData
      ?.find((org: any) => org.id === selectedUniversitas)
      ?.children.find((child: any) => child.id === selectedFakultas);
    return (
      fakultas?.children.map((child: any) => ({
        value: child.id,
        label: child.name,
      })) || []
    );
  }, [selectedUniversitas, selectedFakultas, organizationsData]);

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 pb-16">
        <TextInput
          label="Nama Dosen"
          variant="filled"
          name="namaPenghubung"
          placeholder=""
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="NIP"
          variant="filled"
          name="nip"
          placeholder=""
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("nip")}
        />
        <Select
          label="Universitas"
          variant="filled"
          placeholder=""
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          data={universitasOptions}
          value={selectedUniversitas}
          onChange={(value) => {
            setSelectedUniversitas(value);
            setSelectedFakultas(null); // Reset Fakultas and Prodi selection when Universitas changes
            form.setFieldValue("id_organization", null); // Reset id_organization
          }}
          required
        />

        <Select
          label="Fakultas"
          variant="filled"
          placeholder=""
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          data={fakultasOptions}
          value={selectedFakultas}
          onChange={(value) => {
            setSelectedFakultas(value);
            form.setFieldValue("id_organization", null); // Reset id_organization when Fakultas changes
          }}
          required
          disabled={!selectedUniversitas}
        />
        <Select
          label="Prodi"
          variant="filled"
          placeholder=""
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          data={prodiOptions}
          required
          {...form.getInputProps("id_organization")}
          disabled={!selectedFakultas}
        />
        <TextInput
          label="Alamat"
          variant="filled"
          name="address"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          {...form.getInputProps("address")}
        />
        <TextInput
          label="Kontak"
          variant="filled"
          name="contact"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          {...form.getInputProps("contact")}
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

export default DosenCreateForm;

import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { UpdateDosenDTO, useUpdateDosen } from "../api";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOrganizationLevels } from "features/organization";

interface Props {
  dosen: {
    id: any;
    id_organization: any;
    name: string;
    nip: any;
    address: any;
    contact: any;
    children: any;
  };
  onSuccess: VoidFunction;
}

const DosenUpdateForm: React.FC<Props> = ({ dosen, onSuccess }) => {
  const form = useForm<UpdateDosenDTO["data"]>({
    initialValues: {
      id: dosen.id,
      id_organization: dosen.id_organization,
      name: dosen.name,
      nip: dosen.nip,
      address: dosen.address,
      contact: dosen.contact,
    },
  });

  const { data: organizationsData, isLoading: isLoadingLevel } =
    useOrganizationLevels();

  const { mutateAsync, isLoading } = useUpdateDosen({
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
      id: dosen.id,
      data: {
        ...data,
      },
    });
  });

  const [selectedUniversitas, setSelectedUniversitas] = useState<string | null>(
    null
  );
  const [selectedFakultas, setSelectedFakultas] = useState<string | null>(null);

  // Set initial states based on `dosen.id_organization`
  useEffect(() => {
    if (dosen.id_organization && organizationsData) {
      const findParentHierarchy = (id: string, data: any) => {
        for (const org of data) {
          for (const fakultas of org.children || []) {
            for (const prodi of fakultas.children || []) {
              if (prodi.id === id)
                return {
                  universitas: org.id,
                  fakultas: fakultas.id,
                  prodi: id,
                };
            }
            if (fakultas.id === id)
              return { universitas: org.id, fakultas: id, prodi: null };
          }
          if (org.id === id)
            return { universitas: id, fakultas: null, prodi: null };
        }
        return { universitas: null, fakultas: null, prodi: null };
      };

      const { universitas, fakultas, prodi } = findParentHierarchy(
        dosen.id_organization,
        organizationsData
      );
      setSelectedUniversitas(universitas);
      setSelectedFakultas(fakultas);
      form.setFieldValue("id_organization", prodi || fakultas || universitas);
    }
  }, [dosen.id_organization, organizationsData]);

  const universitasOptions = useMemo(
    () =>
      organizationsData?.map((org: any) => ({
        value: org.id,
        label: org.name,
      })) || [],
    [organizationsData]
  );

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
          data={universitasOptions}
          value={selectedUniversitas}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          onChange={(value) => {
            setSelectedUniversitas(value);
            setSelectedFakultas(null); // Reset Fakultas and Prodi selection when Universitas changes
            form.setFieldValue("id_organization", null);
          }}
          required
        />
        <Select
          label="Fakultas"
          variant="filled"
          data={fakultasOptions}
          value={selectedFakultas}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          onChange={(value) => {
            setSelectedFakultas(value);
            form.setFieldValue("id_organization", null); // Reset Prodi when Fakultas changes
          }}
          required
          disabled={!selectedUniversitas}
        />
        <Select
          label="Prodi"
          variant="filled"
          data={prodiOptions}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          {...form.getInputProps("id_organization")}
          required
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

export default DosenUpdateForm;

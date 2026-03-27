import {
  Button,
  Group,
  MultiSelect,
  PasswordInput,
  Radio,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { CreateUserDTO, useCreateUser } from "../api";
import { useEffect, useMemo, useState } from "react";
import { useFacultys } from "features/faculty";
import { useFacultyAlls } from "features/faculty/api/getFacultyAll";

interface Props {
  onSuccess: VoidFunction;
  dataRole: any;
}

const UserCreateForm: React.FC<Props> = ({ onSuccess, dataRole }) => {
  const [facultyValue, setFacultyValue] = useState<any>("");
  const [prodiData, setProdiData] = useState([]);
  const [valueRadio, setValueRadio] = useState("n");
  const { data: dataFaculty } = useFacultys();
  const form = useForm<CreateUserDTO["data"]>({
    initialValues: {
      username: "",
      password: "",
      prodi: "",
      role: [],
    },
  });

  const { data } = useFacultyAlls({ facultyValue } as any);

  useEffect(() => {
    if (data) {
      setProdiData(data.prodi);
      form.setValues({ prodi: "" });
    }
  }, [facultyValue, data]);

  const roles = useMemo(() => {
    return (dataRole ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataRole]);

  const { mutateAsync, isLoading } = useCreateUser({
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await mutateAsync({ data: form.values });
  }

  const faculty = useMemo(() => {
    return (dataFaculty ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [dataFaculty]);

  const prodi = useMemo(() => {
    return (prodiData ?? []).map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
  }, [prodiData]);

  return (
    <form className="relative px-3 pb-5" onSubmit={handleSubmit}>
      <div className="grid gap-y-4 lg:space-y-0 pb-16">
        <TextInput
          label={<div>Username</div>}
          variant="filled"
          name="username"
          placeholder=""
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("username")}
        />
        <PasswordInput
          label={<div>Password</div>}
          variant="filled"
          name="password"
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          required
          {...form.getInputProps("password")}
        />
        <MultiSelect
          label={<div>Role</div>}
          description="Bisa Dipilh Lebih dari 1"
          data={roles}
          clearable
          dropdownPosition="bottom"
          required
          withAsterisk={false}
          styles={{
            input: { borderColor: "#00000035", background: "#F9F9F9CC" },
          }}
          {...form.getInputProps("role")}
        />
        <Radio.Group
          value={valueRadio}
          onChange={setValueRadio}
          label="Apakah Akun Untuk Prodi?"
          description="Jika akunnya untuk super admin maka pilih tidak, akan tetapi jika akun ini untuk prodi maka pilih iya"
          withAsterisk
        >
          <Group mt="xs">
            <Radio value="y" label="Iya" />
            <Radio value="n" label="No" />
          </Group>
        </Radio.Group>
        {valueRadio == "y" ? (
          <>
            <Select
              label={<div>Fakultas</div>}
              data={faculty}
              variant="filled"
              name="faculty"
              withAsterisk={false}
              styles={{
                input: { borderColor: "#00000035", background: "#F9F9F9CC" },
              }}
              onChange={setFacultyValue}
            />

            <Select
              label={<div>Prodi</div>}
              data={prodi}
              disabled={facultyValue == ""}
              variant="filled"
              name="prody"
              withAsterisk={false}
              styles={{
                input: { borderColor: "#00000035", background: "#F9F9F9CC" },
              }}
              {...form.getInputProps("prodi")}
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
          className="bg-orange-500 hover:bg-orange-600"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default UserCreateForm;

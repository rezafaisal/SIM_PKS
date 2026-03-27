import React, { useEffect, useState } from "react";
import { TextInput, Button, Text } from "@mantine/core";
import {
  IconTrash,
  IconEdit,
  IconPlus,
  IconSearch,
  IconX,
} from "@tabler/icons";
import Table2 from "components/elements/Table/Table2";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { RoleCreateForm, RoleUpdateForm } from ".";
import { useDeleteRole } from "../api";
import { showNotification } from "@mantine/notifications";

const columns = [
  { id: "no", label: "No" },
  { id: "name", label: "Role" },
  { id: "access_pages", label: "Halaman yang bisa diakses" },
  { id: "", label: "Aksi" },
];

const RoleTable = ({ data, dataPages }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState<any>([]);
  const { mutateAsync } = useDeleteRole({
    config: {
      onSuccess() {
        closeAllModals();
      },
      onError({ response }) {
        showNotification({
          message: (response?.data as any).messages.error,
          color: "red",
          icon: IconX({}),
        });
      },
    },
  });
  useEffect(() => {
    if (data) {
      setDatas(
        data.map((item: any, index: number) => {
          return {
            ...item,
            no: index + 1,
          };
        })
      );
    }
  }, [data]);

  function handleAdd() {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Add Role
        </div>
      ),
      radius: "md",
      children: (
        <RoleCreateForm onSuccess={closeAllModals} dataPages={dataPages} />
      ),
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function handleUpdate(role: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Update Role
        </div>
      ),
      radius: "md",
      children: (
        <RoleUpdateForm
          onSuccess={closeAllModals}
          role={role}
          dataPages={dataPages}
        />
      ),
    });
  }

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus Role",
      children: (
        <Text size="sm">Apakah anda yakin untuk menghapus Role ini?</Text>
      ),
      centered: true,
      closeOnConfirm: false,
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await mutateAsync({ id });
      },
    });
  }

  return (
    <form
      className="relative bg-white px-5 pt-4 pb-6 rounded-xl shadow"
      // onSubmit={handleSubmit}
    >
      <div className="flex  justify-between items-top pb-5 ">
        <div className=" text-gray-900 text-[22px] font-semibold ">
          Table Role Management
        </div>
      </div>
      <div className="pb-3 flex gap-x-5 mb-3 mt-3 justify-between">
        <TextInput
          className="font-medium "
          placeholder="Cari..."
          radius="xl"
          onChange={handleSearch}
          icon={<IconSearch size="23" className="text-black text-opacity-70" />}
        />
        <Button
          variant="filled"
          color="orange.4"
          radius="lg"
          leftIcon={<IconPlus size="28" className="text-white " stroke="3" />}
          className="font-semibold shadow"
          onClick={handleAdd}
        >
          Tambah
        </Button>
      </div>
      <Table2
        header={columns}
        items={datas}
        searchTerm={searchTerm}
        renderItem={(role) => (
          <tr key={role.id} className="">
            <td
              key={columns[0].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {role[columns[0].id as keyof typeof role]}
            </td>
            <td
              key={columns[1].id}
              className="py-5 px-4 font-bold capitalize text-sm text-gray-700"
            >
              {role[columns[1].id as keyof typeof role]}
            </td>
            <td
              key={columns[2].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              <ul className="pl-3">
                {role[columns[2].id as keyof typeof role].map((item: any) => (
                  <li className="capitalize">{item}</li>
                ))}
              </ul>
            </td>

            <td className=" py-5 w-40 ">
              <div className="flex gap-x-3 items-center justify-center">
                <IconEdit
                  onClick={() => handleUpdate(role)}
                  className="border-2 rounded-md text-orange-500 hover:bg-orange-50 cursor-pointer"
                />
                <IconTrash
                  onClick={() => handleRemove(role.id)}
                  className="border-2 rounded-md text-red-500 hover:bg-red-50 cursor-pointer"
                />
              </div>
            </td>
          </tr>
        )}
      />
    </form>
  );
};

export default RoleTable;

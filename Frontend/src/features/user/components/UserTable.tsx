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
import { UserCreateForm, UserUpdateForm } from ".";
import { useDeleteUser } from "../api";
import { showNotification } from "@mantine/notifications";

const columns = [
  { id: "no", label: "No" },
  { id: "username", label: "Username" },
  { id: "roles", label: "Role" },
  { id: "level", label: "Tingkat" },
  { id: "", label: "Aksi" },
];

const UserTable = ({ data, role }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState<any>([]);
  const [roles, setRoles] = useState<any>({});
  const { mutateAsync } = useDeleteUser({
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

  const predefinedColors = [
    "#40c057",
    "#fab005",
    "#228be6",
    "#be4bdb",
    "#fa5252",
  ];

  useEffect(() => {
    if (data) {
      setDatas(
        data.map((item: any, index: number) => {
          return {
            ...item,
            no: index + 1,
            level: item.prodi.name ? item.prodi.name : "Admin",
          };
        })
      );
    }

    if (role) {
      setRoles(
        Object.assign(
          {},
          ...role.map((item: any, index: number) => ({
            [item.name]: predefinedColors[index % predefinedColors.length],
          }))
        )
      );
    }
  }, [data, role]);

  function handleAdd() {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Add User
        </div>
      ),
      radius: "md",
      children: <UserCreateForm onSuccess={closeAllModals} dataRole={role} />,
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function handleUpdate(user: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Update User
        </div>
      ),
      radius: "md",
      children: (
        <UserUpdateForm
          onSuccess={closeAllModals}
          user={user}
          dataRole={role}
        />
      ),
    });
  }

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus User",
      children: (
        <Text size="sm">Apakah anda yakin untuk menghapus User ini?</Text>
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
          Table User Management
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
        renderItem={(user) => (
          <tr key={user.id} className="">
            <td
              key={columns[0].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {user[columns[0].id as keyof typeof user]}
            </td>
            <td
              key={columns[1].id}
              className="py-5 px-4 font-semibold text-sm text-gray-700"
            >
              {user[columns[1].id as keyof typeof user]}
            </td>
            <td key={columns[2].id} className="py-5 px-5 space-x-2  text-xs  ">
              {user[columns[2].id as keyof typeof user].map((item: any) => (
                <span
                  className={"uppercase py-1 px-3 rounded-3xl font-semibold"}
                  style={{
                    color: `${roles[item]}`,
                    backgroundColor: `${roles[item]}` + "25",
                  }}
                >
                  {item}
                </span>
              ))}
            </td>
            <td
              key={columns[3].id}
              className={`py-5 px-4 font-semibold text-sm  ${
                user[columns[3].id as keyof typeof user] != "Admin"
                  ? "text-gray-700"
                  : "text-blue-700"
              }`}
            >
              {user[columns[3].id as keyof typeof user]}
            </td>

            <td className=" py-5 w-40 ">
              <div className="flex gap-x-3 items-center justify-center">
                <IconEdit
                  onClick={() => handleUpdate(user)}
                  className="border-2 rounded-md text-orange-500 hover:bg-orange-50 cursor-pointer"
                />
                <IconTrash
                  onClick={() => handleRemove(user.id)}
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

export default UserTable;

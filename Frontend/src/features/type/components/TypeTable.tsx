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
import { TypeCreateForm, TypeUpdateForm } from ".";
import { useDeleteType } from "../api";
import { showNotification } from "@mantine/notifications";

const columns = [
  { id: "no", label: "No" },
  { id: "name", label: "Jenis" },
  { id: "", label: "Aksi" },
];

const TypeTable = ({ data }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState<any>([]);
  const { mutateAsync } = useDeleteType({
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
          Add Type
        </div>
      ),
      radius: "md",
      children: <TypeCreateForm onSuccess={closeAllModals} />,
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function handleUpdate(type: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Update Type
        </div>
      ),
      radius: "md",
      children: <TypeUpdateForm onSuccess={closeAllModals} type={type} />,
    });
  }

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus Type",
      children: (
        <Text size="sm">Apakah anda yakin untuk menghapus Type ini?</Text>
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
          Table Type
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
        renderItem={(type) => (
          <tr key={type.id} className="">
            <td
              key={columns[0].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {type[columns[0].id as keyof typeof type]}
            </td>
            <td
              key={columns[1].id}
              className="py-5 px-4 font-bold capitalize text-sm text-gray-700"
            >
              {type[columns[1].id as keyof typeof type]}
            </td>

            <td className=" py-5 w-40 ">
              <div className="flex gap-x-3 items-center justify-center">
                <IconEdit
                  onClick={() => handleUpdate(type)}
                  className="border-2 rounded-md text-orange-500 hover:bg-orange-50 cursor-pointer"
                />
                <IconTrash
                  onClick={() => handleRemove(type.id)}
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

export default TypeTable;

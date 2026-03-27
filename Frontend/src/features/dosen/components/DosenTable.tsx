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
import { DosenCreateForm, DosenUpdateForm } from ".";
import { useDeleteDosen } from "../api";
import { showNotification } from "@mantine/notifications";

const columns = [
  { id: "no", label: "No" },
  { id: "name", label: "Nama / NIP" },
  { id: "organization_name", label: "Prodi" },
  { id: "address", label: "Alamat" },
  { id: "contact", label: "Kontak" },
  { id: "", label: "Aksi" },
];

const DosenTable = ({ data }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState<any>([]);
  const { mutateAsync } = useDeleteDosen({
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
          Add Dosen
        </div>
      ),
      radius: "md",
      children: <DosenCreateForm onSuccess={closeAllModals} />,
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function handleUpdate(dosen: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Update Dosen
        </div>
      ),
      radius: "md",
      children: <DosenUpdateForm onSuccess={closeAllModals} dosen={dosen} />,
    });
  }

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus Dosen",
      children: (
        <Text size="sm">Apakah anda yakin untuk menghapus Dosen ini?</Text>
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
          Table Dosen
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
        renderItem={(dosen) => (
          <tr key={dosen.id} className="">
            <td
              key={columns[0].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {dosen[columns[0].id as keyof typeof dosen]}
            </td>

            <td
              key={columns[1].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              <span className="font-bold">
                {dosen[columns[1].id as keyof typeof dosen]
                  ? dosen[columns[1].id as keyof typeof dosen]
                  : "-"}{" "}
                <br />
              </span>
              {dosen.nip ? dosen.nip : "-"}
            </td>
            <td
              key={columns[2].id}
              className="py-5 px-4 font-medium capitalize text-sm text-gray-700"
            >
              {dosen[columns[2].id as keyof typeof dosen]}
            </td>
            <td
              key={columns[3].id}
              className="py-5 px-4 font-medium capitalize text-sm text-slate-600 min-w-[20rem] !whitespace-normal"
            >
              {dosen[columns[3].id as keyof typeof dosen]}
            </td>
            <td
              key={columns[4].id}
              className="py-5 px-4 font-medium capitalize text-sm text-gray-700"
            >
              {dosen[columns[4].id as keyof typeof dosen]}
            </td>

            <td className=" py-5 w-40 ">
              <div className="flex gap-x-3 items-center justify-center">
                <IconEdit
                  onClick={() => handleUpdate(dosen)}
                  className="border-2 rounded-md text-orange-500 hover:bg-orange-50 cursor-pointer"
                />
                <IconTrash
                  onClick={() => handleRemove(dosen.id)}
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

export default DosenTable;

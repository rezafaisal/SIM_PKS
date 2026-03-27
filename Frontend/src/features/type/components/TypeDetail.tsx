import { Button } from "@mantine/core";
import { Text } from "@mantine/core";

import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useDeleteType } from "../api";

import { useState } from "react";
import TypeUpdateForm from "./TypeUpdateForm";

interface Props {
  type: {
    id: number;
    name: string;
    prodi_names: string[];
  };
  onSuccess: VoidFunction;
}

const TypeDetail: React.FC<Props> = ({ type, onSuccess }) => {
  const { mutateAsync, isLoading } = useDeleteType({
    config: {
      onSuccess() {
        closeAllModals();
      },
    },
  });

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus Type",
      children: (
        <Text size="sm">Apakah anda yakin untuk menghapus type ini?</Text>
      ),
      centered: true,
      closeOnConfirm: false,
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await mutateAsync({ id });
      },
    });
  }

  function handleUpdate(type: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Update Implementasi
        </div>
      ),
      radius: "lg",
      children: <TypeUpdateForm onSuccess={closeAllModals} type={type} />,
    });
  }

  return (
    <section className="relative px-3 pb-5">
      <div className="grid gap-y-4 lg:space-y-0 text-zinc-500 text-[13px] sm:text-[15px] font-medium">
        <span className="">
          Fakultas
          <div className="font-bold">{type.name}</div>
        </span>
        <span className="">
          Prodi
          <ul className="font-bold pl-3 mt-0">
            {type?.prodi_names.map((item: any) => (
              <li>{item}</li>
            ))}
          </ul>
        </span>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          onClick={() => handleRemove(type.id)}
          type="button"
          loading={isLoading}
          className="bg-red-700 hover:bg-red-800"
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={() => handleUpdate(type)}
          loading={isLoading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Edit
        </Button>
      </div>
    </section>
  );
};

export default TypeDetail;

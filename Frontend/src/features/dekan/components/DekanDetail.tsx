import { Button } from "@mantine/core";
import { Text } from "@mantine/core";

import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useDeleteDekan } from "../api";

import { useState } from "react";
import DekanUpdateForm from "./DekanUpdateForm";
import dayjs from "dayjs";

interface Props {
  dekan: {
    id: number;
    name: string;
    nip: string;
    position: string;
    facultys_name: string;
    period: string;
  };
  onSuccess: VoidFunction;
  dataFaculty: any;
}

const DekanDetail: React.FC<Props> = ({ dekan, dataFaculty }) => {
  const { mutateAsync, isLoading } = useDeleteDekan({
    config: {
      onSuccess() {
        closeAllModals();
      },
    },
  });

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus Dekan",
      children: (
        <Text size="sm">Apakah anda yakin untuk menghapus dekan ini?</Text>
      ),
      centered: true,
      closeOnConfirm: false,
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await mutateAsync({ id });
      },
    });
  }

  function handleUpdate(dekan: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Update Dekan
        </div>
      ),
      radius: "lg",
      children: (
        <DekanUpdateForm
          onSuccess={closeAllModals}
          dekan={dekan}
          dataFaculty={dataFaculty}
        />
      ),
    });
  }

  return (
    <section className="relative px-3 pb-5">
      <div className="grid gap-y-4 lg:space-y-0 text-zinc-500 text-[13px] sm:text-[15px] font-medium">
        <span className="">
          Nama Dekan
          <div className="font-bold">{dekan.name}</div>
        </span>
        <span className="">
          NIP
          <div className="font-bold">{dekan.nip}</div>
        </span>
        <span className="">
          Jabatan
          <div className="font-bold ">{dekan.position}</div>
        </span>
        <span className="">
          Fakultas
          <div className="font-bold ">{dekan.facultys_name}</div>
        </span>
        <span className="">
          Periode
          <div className="font-bold ">
            {dayjs(dekan.period[0]).format("YYYY") +
              ` - ` +
              dayjs(dekan.period[1]).format("YYYY")}
          </div>
        </span>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          onClick={() => handleRemove(dekan.id)}
          type="button"
          loading={isLoading}
          className="bg-red-700 hover:bg-red-800"
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={() => handleUpdate(dekan)}
          loading={isLoading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Edit
        </Button>
      </div>
    </section>
  );
};

export default DekanDetail;

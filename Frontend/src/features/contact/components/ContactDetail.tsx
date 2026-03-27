import { Button } from "@mantine/core";
import { Tabs, Text } from "@mantine/core";

import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { useDeleteContact } from "../api";

import { useState } from "react";
import ContactUpdateForm from "./ContactUpdateForm";

interface Props {
  contact: {
    id: number;
    name: string;
    nip: string;
    facultys_name: string;
    position: string;
    address: string;
    handphone_no: string;
    email: string;
  };
  onSuccess: VoidFunction;
  dataFaculty: any;
}

const ContactDetail: React.FC<Props> = ({ contact, dataFaculty }) => {
  const { mutateAsync, isLoading } = useDeleteContact({
    config: {
      onSuccess() {
        closeAllModals();
      },
    },
  });

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus Contact",
      children: (
        <Text size="sm">Apakah anda yakin untuk menghapus contact ini?</Text>
      ),
      centered: true,
      closeOnConfirm: false,
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await mutateAsync({ id });
      },
    });
  }

  function handleUpdate(contact: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Update Penghubung Fakultas
        </div>
      ),
      radius: "lg",
      children: (
        <ContactUpdateForm
          onSuccess={closeAllModals}
          contact={contact}
          dataFaculty={dataFaculty}
        />
      ),
    });
  }

  return (
    <section className="relative px-3 pb-5">
      <div className="grid gap-y-4 lg:space-y-0 text-zinc-500 text-[13px] sm:text-[15px] font-medium">
        <span className="capitalize">
          Nama Penghubung
          <div className="font-bold">{contact.name}</div>
        </span>
        <span className="capitalize">
          NIP
          <div className="font-bold">{contact.nip}</div>
        </span>
        <span className="">
          fakultas
          <div className="font-bold">{contact.facultys_name}</div>
        </span>
        <span className="">
          Jabatan
          <div className="font-bold">{contact.position}</div>
        </span>
        <span className="">
          alamat
          <div className="font-bold">{contact.address}</div>
        </span>
        <span className="">
          Kontak
          <div className="font-bold">{contact.handphone_no}</div>
        </span>
        <span className="">
          Email
          <div className="font-bold">{contact.email}</div>
        </span>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          onClick={() => handleRemove(contact.id)}
          type="button"
          loading={isLoading}
          className="bg-red-700 hover:bg-red-800"
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={() => handleUpdate(contact)}
          loading={isLoading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Edit
        </Button>
      </div>
    </section>
  );
};

export default ContactDetail;

import { Button, Text, TextInput } from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import {
  IconCopy,
  IconPlus,
  IconPrinter,
  IconSearch,
  IconTrash,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import Table2 from "components/elements/Table/Table2";
import CollaborationImplementationCreateForm from "./CollaborationImplementationCreateForm";
import { useDeleteImplementation } from "features/collaboration/api/deleteImplementation";
import { dayjs } from "lib/dayjs";

interface Props {
  dataImplementation: any;
  idCollab: any;
  dataProdi: any;
}

const columns = [
  { id: "no", label: "No" },
  { id: "name", label: "Nama Implementasi" },
  { id: "attachmentType", label: "Jenis lampiran" },
  { id: "prodi", label: "Prodi" },
  { id: "created_at", label: "Tanggal Pelaksanaan" },
  { id: "", label: "" },
];

const CollaborationImplementationTable: React.FC<Props> = ({
  dataImplementation,
  idCollab,
  dataProdi,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState<any>([]);
  const { mutateAsync, isLoading: isLoadingDelete } = useDeleteImplementation({
    config: {
      onSuccess() {
        closeAllModals();
      },
    },
  });

  useEffect(() => {
    if (dataImplementation) {
      setDatas(
        dataImplementation.map((item: any, index: number) => {
          return {
            ...item,
            no: index + 1,
            attachmentType: item.attachment_file ? "File" : "Link",
          };
        })
      );
    }
  }, [dataImplementation]);

  function handleAdd() {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Add Implementation
        </div>
      ),
      radius: "md",
      children: (
        <CollaborationImplementationCreateForm
          onSuccess={closeAllModals}
          idCollab={idCollab}
          dataProdi={dataProdi}
        />
      ),
    });
  }

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus Collaboration",
      children: (
        <Text size="sm">
          Apakah anda yakin untuk menghapus Implementasi ini?
        </Text>
      ),
      centered: true,
      closeOnConfirm: false,
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await mutateAsync({ id });
      },
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePrint = (attachmentFile: any) => {
    // Placeholder logic for opening the file
    window.open(attachmentFile, "_blank");
  };

  const handleCopy = (attachment: any) => {
    // Placeholder logic for copying
    navigator.clipboard
      .writeText(attachment)
      .then(() => {
        alert("Text copied to clipboard:");
      })
      .catch((error) => {
        alert("Error copying text to clipboard:");
      });
  };

  console.log(dataImplementation);

  return (
    <form className="relative ">
      <div className="flex  justify-between items-top pb-5 ">
        <div className=" text-orange-400 text-[22px] font-semibold ">
          Hasil Implementasi Kerjasama
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
          radius="xl"
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
        renderItem={(collaboration) => (
          <tr key={collaboration.id} className="">
            <td
              key={columns[0].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {collaboration[columns[0].id as keyof typeof collaboration]}
            </td>
            <td
              key={columns[1].id}
              className="py-5 px-4 font-bold text-sm text-gray-700"
            >
              {collaboration[columns[1].id as keyof typeof collaboration]}
            </td>

            <td
              key={columns[2].id}
              className="py-5 px-4 font-medium text-sm text-gray-700 "
            >
              {collaboration[columns[2].id as keyof typeof collaboration]}
            </td>

            <td
              key={columns[3].id}
              className="py-5 px-4 font-medium text-sm text-gray-700 "
            >
              {collaboration[columns[3].id as keyof typeof collaboration].name}
            </td>

            <td
              key={columns[4].id}
              className="py-5 px-4 font-medium text-sm text-gray-700 "
            >
              {dayjs(
                collaboration[columns[4].id as keyof typeof collaboration]
              ).format("D MMM YYYY")}
            </td>

            <td className="gap-x-3 py-5 w-40 ">
              <div className="flex items-center justify-center gap-x-3 ">
                {collaboration[columns[2].id as keyof typeof collaboration] ==
                "File" ? (
                  <IconPrinter
                    onClick={() => handlePrint(collaboration.attachment_file)}
                    className="border-2 rounded-md text-orange-500 hover:bg-orange-50 cursor-pointer"
                  />
                ) : (
                  <IconCopy
                    onClick={() => handleCopy(collaboration.attachment)}
                    className="border-2 rounded-md text-purple-400 hover:bg-purple-50 cursor-pointer"
                  />
                )}
                <IconTrash
                  onClick={() => handleRemove(collaboration.id)}
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

export default CollaborationImplementationTable;

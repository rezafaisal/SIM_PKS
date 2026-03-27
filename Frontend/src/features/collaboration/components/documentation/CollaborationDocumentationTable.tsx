import { Button, TextInput } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { IconNotes, IconPlus, IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
import Table2 from "components/elements/Table/Table2";
import CollaborationDocumentationCreateForm from "./CollaborationDocumentationCreateForm";
import CollaborationDocumentationDetail from "./CollaborationDocumentationDetail";

interface Props {
  dataDocumentation: any;
  partner: any;
  idCollab: any;
  dataType: any;
}

const columns = [
  { id: "no", label: "No" },
  { id: "name", label: "Nama" },
  { id: "title", label: "Judul" },
  { id: "type", label: "Jenis" },
  {
    id: "mitra",
    label: `Nama Mitra`,
  },
  {
    id: "file_image",
    label: `Bukti Implementasi`,
  },
];

const CollaborationDocumentationTable: React.FC<Props> = ({
  dataDocumentation,
  partner,
  idCollab,
  dataType,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    if (dataDocumentation) {
      setDatas(
        dataDocumentation.map((item: any, index: number) => {
          return {
            ...item,
            no: index + 1,
            mitra: partner,
          };
        })
      );
    }
  }, [dataDocumentation]);

  function handleAdd() {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Add Implementasi
        </div>
      ),
      radius: "md",
      children: (
        <CollaborationDocumentationCreateForm
          onSuccess={closeAllModals}
          idCollab={idCollab}
          dataType={dataType}
        />
      ),
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function handleDetail(collaboration: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Detail Laporan
        </div>
      ),

      children: (
        <CollaborationDocumentationDetail
          onSuccess={closeAllModals}
          collaboration={collaboration}
          idCollab={idCollab}
          dataType={dataType}
        />
      ),
      radius: "lg",
    });
  }

  return (
    <form
      className="relative "
      // onSubmit={handleSubmit}
    >
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
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {collaboration[columns[1].id as keyof typeof collaboration]}
            </td>

            <td
              key={columns[2].id}
              className="py-5 px-4 font-bold capitalize text-sm text-gray-700 min-w-[20rem] !whitespace-normal"
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
              {collaboration[columns[4].id as keyof typeof collaboration]}
            </td>
            <td
              key={columns[5].id}
              className="py-5 px-4 font-medium text-sm text-gray-700 "
            >
              <a
                href={
                  collaboration[columns[5].id as keyof typeof collaboration]
                }
                download
                target="_blank"
              >
                <img
                  className="rounded-lg h-28 w-36"
                  src={
                    collaboration[columns[5].id as keyof typeof collaboration]
                  }
                  alt=""
                />
              </a>
            </td>

            <td className="gap-x-3 py-5 w-40 ">
              <div className="flex items-center justify-center">
                <IconNotes
                  onClick={() => handleDetail(collaboration)}
                  className="border-2 rounded-md text-blue-500 hover:bg-blue-50 cursor-pointer"
                />
              </div>
            </td>
          </tr>
        )}
      />
    </form>
  );
};

export default CollaborationDocumentationTable;

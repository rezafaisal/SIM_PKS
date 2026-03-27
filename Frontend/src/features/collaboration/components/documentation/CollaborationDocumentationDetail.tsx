import { Button } from "@mantine/core";
import { Text } from "@mantine/core";

import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";

import CollaborationDocumentationUpdateForm from "./CollaborationDocumentationUpdateForm";
import { useDeleteDocumentation } from "features/collaboration/api/deleteDocumentation";

interface Props {
  collaboration: {
    id: number;
    name: string;
    title: string;
    type: any;
    file_image: string;
  };
  onSuccess: VoidFunction;
  idCollab: any;
  dataType: any;
}

const CollaborationDocumentationDetail: React.FC<Props> = ({
  collaboration,
  idCollab,
  dataType,
}) => {
  const { mutateAsync, isLoading } = useDeleteDocumentation({
    config: {
      onSuccess() {
        closeAllModals();
      },
    },
  });

  function handleRemove(id: number) {
    openConfirmModal({
      title: "Hapus Implementasi",
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

  function handleUpdate(documentation: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Update Implementasi
        </div>
      ),
      radius: "lg",
      children: (
        <CollaborationDocumentationUpdateForm
          onSuccess={closeAllModals}
          documentation={documentation}
          idCollab={idCollab}
          dataType={dataType}
        />
      ),
    });
  }

  return (
    <section className="relative px-3 pb-5">
      <div className="grid gap-y-4 lg:space-y-0 text-zinc-500 text-[13px] sm:text-[15px] font-medium">
        <span className="">
          Nama
          <div className="font-bold">{collaboration.name}</div>
        </span>
        <span className="">
          Judul
          <div className="font-bold">{collaboration.title}</div>
        </span>
        <span className="">
          Jenis
          <div className="font-bold">{collaboration.type.name}</div>
        </span>
        <span className="">
          <div className="flex items-center justify-between">
            Bukti Implementasi
          </div>
          <a href={collaboration.file_image} download target="_blank">
            <img
              className="rounded-lg h-36 w-auto mt-2 shadow-md bg-gray-200"
              src={collaboration.file_image}
              alt=""
            />
          </a>
        </span>
      </div>

      <div className="flex items-center justify-end gap-4 mt-6">
        {/* <Button
          type="button"
          variant="default"
          onClick={() => closeAllModals()}
          loading={isLoading}
        >
          Tutup
        </Button> */}
        <Button
          onClick={() => handleRemove(collaboration.id)}
          type="button"
          loading={isLoading}
          className="bg-red-700 hover:bg-red-800"
        >
          Delete
        </Button>
        <Button
          type="button"
          onClick={() => handleUpdate(collaboration)}
          loading={isLoading}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Edit
        </Button>
      </div>
    </section>
  );
};

export default CollaborationDocumentationDetail;

import React, { useEffect, useState } from "react";
import { TextInput, Button, Text } from "@mantine/core";
import {
  IconPlus,
  IconSearch,
  IconNotes,
  IconCheck,
  IconX,
} from "@tabler/icons";
import Table2 from "components/elements/Table/Table2";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import {
  DekanCreateForm,
  DekanDetail,
  // DekanUpdateForm
} from ".";
import dayjs from "dayjs";
import { useActiveDekan } from "../api/activeDekan";
import { showNotification } from "@mantine/notifications";

const columns = [
  { id: "no", label: "No" },
  { id: "namaDekanJabatan", label: "Nama Dekan/ Jabatan" },
  { id: "facultys_name", label: "Fakultas" },
  { id: "period", label: "Periode" },
  { id: "", label: "Aksi" },
];

const DekanTable = ({ data, dataFaculty }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState<any>([]);

  const { mutateAsync, isLoading } = useActiveDekan({
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
            namaDekanJabatan: {
              namaDekan: item.name,
              jabatan: item.position,
            },
          };
        })
      );
    }
  }, [data]);

  function handleAdd() {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Add Dekan
        </div>
      ),
      radius: "md",
      children: (
        <DekanCreateForm onSuccess={closeAllModals} dataFaculty={dataFaculty} />
      ),
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function handleDetail(dekan: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Detail Dekan
        </div>
      ),

      children: (
        <DekanDetail
          onSuccess={closeAllModals}
          dekan={dekan}
          dataFaculty={dataFaculty}
        />
      ),
      radius: "lg",
    });
  }

  function handleActive(id: number, facultys_name: string, status: string) {
    openConfirmModal({
      title: "Active Dekan",
      children: (
        <Text size="sm">
          Apakah anda yakin {status == "1" ? "Menonaktifkan" : "Mengaktifkan"}{" "}
          dekan ini untuk fakultas {facultys_name}?
        </Text>
      ),
      centered: true,
      closeOnConfirm: false,
      confirmProps: status == "1" ? { color: "gray" } : { color: "green" },
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
          Table Dekan Management
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
        renderItem={(dekan) => (
          <tr key={dekan.id} className="">
            <td
              key={columns[0].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {dekan[columns[0].id as keyof typeof dekan]}
            </td>
            <td
              key={columns[1].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              <span className="font-bold">
                {dekan[columns[1].id as keyof typeof dekan].namaDekan}
                <br />
              </span>
              {dekan[columns[1].id as keyof typeof dekan].jabatan}
            </td>
            <td
              key={columns[2].id}
              className="py-5 px-4 font-medium capitalize text-sm text-gray-700"
            >
              {dekan[columns[2].id as keyof typeof dekan]}
            </td>
            <td
              key={columns[3].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {dayjs(dekan[columns[3].id as keyof typeof dekan][0]).format(
                "YYYY"
              )}{" "}
              -{" "}
              {dayjs(dekan[columns[3].id as keyof typeof dekan][1]).format(
                "YYYY"
              )}
            </td>

            <td className=" py-5 w-40 ">
              <div className="flex gap-x-3 items-center justify-center">
                <IconNotes
                  onClick={() => handleDetail(dekan)}
                  className="border-2 rounded-md text-blue-500 hover:bg-blue-50 cursor-pointer"
                />
                <IconCheck
                  onClick={() =>
                    handleActive(dekan.id, dekan.facultys_name, dekan.status)
                  }
                  stroke={2.5}
                  className={`border-2 rounded-md cursor-pointer ${
                    dekan.status == "1"
                      ? "text-white border-green-400 bg-green-400 hover:bg-green-200}"
                      : "text-gray-500 hover:bg-gray-50"
                  } `}
                />
              </div>
            </td>
          </tr>
        )}
      />
    </form>
  );
};

export default DekanTable;

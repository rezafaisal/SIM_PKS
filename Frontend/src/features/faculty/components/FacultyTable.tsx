import React, { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { IconPlus, IconSearch, IconNotes } from "@tabler/icons";
import Table2 from "components/elements/Table/Table2";
import { closeAllModals, openModal } from "@mantine/modals";
import { FacultyCreateForm, FacultyDetail } from ".";

const columns = [
  { id: "no", label: "No" },

  { id: "name", label: "Fakultas" },
  { id: "prodi_names", label: "Prodi" },
  { id: "", label: "Aksi" },
];

const FacultyTable = ({ data }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState<any>([]);

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
          Add Fakultas
        </div>
      ),
      radius: "md",
      children: <FacultyCreateForm onSuccess={closeAllModals} />,
    });
  }

  function handleDetail(faculty: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Detail Fakultas
        </div>
      ),

      children: <FacultyDetail onSuccess={closeAllModals} faculty={faculty} />,
      radius: "lg",
    });
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form
      className="relative bg-white px-5 pt-4 pb-6 rounded-xl shadow"
      // onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-top pb-5 ">
        <div className=" text-gray-900 text-[22px] font-semibold ">
          Table Fakultas
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
        renderItem={(faculty) => (
          <tr key={faculty.id} className="">
            <td
              key={columns[0].id}
              className="py-5 px-4 font-medium text-sm text-gray-700"
            >
              {faculty[columns[0].id as keyof typeof faculty]}
            </td>
            <td
              key={columns[1].id}
              className="py-5 px-4 font-bold capitalize text-sm text-gray-700"
            >
              {faculty[columns[1].id as keyof typeof faculty]}
            </td>
            <td
              key={columns[2].id}
              className="py-5 px-4 font-medium capitalize text-sm text-gray-700"
            >
              <ul className="pl-3">
                {faculty[columns[2].id as keyof typeof faculty].map(
                  (item: any) => (
                    <li>{item}</li>
                  )
                )}
              </ul>
            </td>

            <td className=" py-5 w-40 ">
              <div className="flex gap-x-3 items-center justify-center">
                <IconNotes
                  onClick={() => handleDetail(faculty)}
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

export default FacultyTable;

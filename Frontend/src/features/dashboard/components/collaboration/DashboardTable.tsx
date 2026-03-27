import React, { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch, IconNotes } from "@tabler/icons";
import Table2 from "components/elements/Table/Table2";
import { closeAllModals, openModal } from "@mantine/modals";

import CollaborationDetail from "./DashboardDetail";

const columns = [
  { id: "no", label: "No" },
  { id: "mitra_penandatangan", label: "Mitra / Penandatangan" },

  { id: "title", label: "Judul Kerjasama" },
  { id: "noSurat", label: "No Surat" },
  { id: "statusDeadline", label: "Durasi Kerjasama" },

  { id: "", label: "Aksi" },
];

const DashboardTable = ({ data }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (data) {
      setDatas(
        data.map((item: any, index: number) => {
          return {
            ...item,
            no: index + 1,
            mitra_penandatangan: {
              mitra: item.partner.partner_name,
              penandatangan: item.partner.signatory_name,
            },
            noSurat: {
              ns_1: item.letterNo[0],
              ns_2: item.letterNo[1],
            },
            statusDeadline: item.expiredDate
              ? calculateDays(item.expiredDate, new Date()) >= 0
                ? "Selesai"
                : Math.abs(calculateDays(item.expiredDate, new Date())) +
                  " Hari"
              : "Belum Ditentukan",
            deadline: calculateDays(item.expiredDate, new Date()),
          };
        })
      );
    }
  }, [data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function calculateDays(startDate: string, endDate: Date) {
    // Convert the dates to UTC to ensure consistent calculations
    const start = new Date(new Date(startDate).toUTCString());
    const end = new Date(endDate.toUTCString());

    // Calculate the difference in milliseconds
    const diffMs = end.getTime() - start.getTime();

    // Convert milliseconds to days
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  function handleDetail(collaboration: any) {
    openModal({
      title: (
        <div className="text-2xl font-bold text-slate-700 px-3 pt-3">
          Detail Laporan
        </div>
      ),
      size: "100%",
      children: (
        <CollaborationDetail
          onSuccess={closeAllModals}
          collaboration={collaboration}
        />
      ),
      radius: "lg",
    });
  }

  return (
    <div className="bg-white px-5 pt-4 pb-6 rounded-xl shadow">
      <div className=" text-black text-[22px] font-semibold ">
        Table Laporan Data
      </div>
      <div className="pb-3 flex gap-x-5 mb-3 mt-3 justify-between">
        <TextInput
          className="font-medium "
          placeholder="Cari..."
          radius="xl"
          onChange={handleSearch}
          icon={<IconSearch size="23" className="text-black text-opacity-70" />}
        />
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
              <span className="font-bold">
                {collaboration[columns[1].id as keyof typeof collaboration]
                  ?.mitra
                  ? collaboration[columns[1].id as keyof typeof collaboration]
                      ?.mitra
                  : "-"}{" "}
                <br />
              </span>
              {collaboration[columns[1].id as keyof typeof collaboration]
                ?.penandatangan
                ? collaboration[columns[1].id as keyof typeof collaboration]
                    ?.penandatangan
                : "-"}
            </td>
            <td
              key={columns[2].id}
              className="py-5 px-4 font-bold text-sm text-gray-700 min-w-[20rem] !whitespace-normal"
            >
              {collaboration[columns[2].id as keyof typeof collaboration]}
            </td>

            <td
              key={columns[3].id}
              className="py-5 px-4 font-medium text-sm text-gray-700 "
            >
              <ul className="pl-3">
                <li>
                  {
                    collaboration[columns[3].id as keyof typeof collaboration]
                      ?.ns_1
                  }
                </li>
                <li>
                  {
                    collaboration[columns[3].id as keyof typeof collaboration]
                      ?.ns_2
                  }
                </li>
              </ul>
            </td>
            <td
              key={columns[4].id}
              className={`py-5 px-4 font-medium text-sm text-white `}
            >
              <span
                className={`capitalize py-1 px-3 rounded-3xl font-semibold ${
                  !collaboration.expiredDate
                    ? "bg-gray-500"
                    : collaboration.deadline >= 0
                    ? "bg-green-500"
                    : collaboration.deadline > -30
                    ? "bg-yellow-500"
                    : "bg-sky-400"
                }`}
              >
                {collaboration[columns[4].id as keyof typeof collaboration]}
              </span>
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
    </div>
  );
};

export default DashboardTable;

import TableSkeleton from "./TableSkeleton";
import {
  IconChevronUp,
  IconChevronDown,
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsRight,
} from "@tabler/icons";
import { dayjs } from "lib/dayjs";
import { useState } from "react";

interface Props {
  header: {
    id: string;
    label: string;
  }[];
  items: any[];
  searchTerm: string;
  renderItem: (item: any) => React.ReactNode;
  loading?: boolean;
}

const Table2 = ({ header, items, searchTerm, renderItem, loading }: Props) => {
  const [sortColumn, setSortColumn] = useState(header[0].id);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (columnId: string) => {
    if (columnId === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const filteredData = items.filter((item) => {
    const itemValues = Object.values(item);

    return itemValues.some((value) => {
      if (Array.isArray(value)) {
        return value.some((arrayItem) =>
          String(arrayItem).toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (typeof value === "string" || typeof value === "number") {
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      }

      if (value instanceof Date) {
        const dateString = dayjs(value).format("YYYY-MM-DD");
        return dateString.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return false;
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const columnA = a[sortColumn as keyof typeof a];
    const columnB = b[sortColumn as keyof typeof a];

    if (columnA < columnB) {
      return sortDirection === "asc" ? -1 : 1;
    }

    if (columnA > columnB) {
      return sortDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const goToFirstPage = () => {
    setPage(0);
  };

  const goToLastPage = () => {
    setPage(Math.ceil(filteredData.length / rowsPerPage) - 1);
  };

  return (
    <>
      <div className="text-gray-700 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-50">
        <table className="table-auto w-full">
          <thead className="border-t border-b-[1.5px] border-gray-300 mx-4">
            <tr>
              {header.map((column, index) =>
                column.id != "" ? (
                  <th
                    key={index + "_" + column}
                    onClick={() => handleSort(column.id)}
                    className="cursor-pointer py-4 px-4 text-left font-semibold w-max text-xs uppercase whitespace-nowrap"
                  >
                    <div className="flex items-center gap-x-4 text-center">
                      {column.label}
                      {sortColumn === column.id && sortDirection === "asc" && (
                        <IconChevronUp size={16} className="text-orange-800" />
                      )}
                      {sortColumn === column.id && sortDirection === "desc" && (
                        <IconChevronDown
                          size={16}
                          className="text-orange-800"
                        />
                      )}
                      {sortColumn !== column.id && (
                        <IconChevronUp
                          size={16}
                          className="text-slate-400 opacity-60"
                        />
                      )}
                    </div>
                  </th>
                ) : (
                  <th className="py-4 px-4 font-semibold text-center w-40 text-xs uppercase whitespace-nowrap ">
                    Aksi
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-gray-300 border-b border-b-gray-300 [&_td]:whitespace-nowrap [&_td]:px-5 [&_td]:py-3">
            {loading ? (
              <TableSkeleton col={header.length} row={5} />
            ) : items.length > 0 ? (
              sortedData.length > 0 ? (
                sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => renderItem(item))
              ) : (
                <tr>
                  <td
                    colSpan={header.length + 1}
                    className="text-center !py-16"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={header.length + 1} className="text-center !py-16">
                  Tidak ada Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/*  */}
      {!loading && items.length > 0 && (
        <div className="flex flex-col-reverse gap-y-4 md:flex-row justify-between items-center mt-4 text-sm">
          <div className="">
            Baris :{" "}
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="border border-gray-300 rounded py-1.5 px-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex  items-center">
            <div>
              <span className="mr-2">
                {page * rowsPerPage + 1} -{" "}
                {Math.min((page + 1) * rowsPerPage, filteredData.length)} dari{" "}
                {filteredData.length}
              </span>
            </div>
            <div className="space-x-1">
              <button
                disabled={page === 0}
                onClick={goToFirstPage}
                className="bg-white text-orange-600 hover:bg-orange-100  border border-orange-600 px-1.5 py-1 rounded disabled:opacity-30"
              >
                <IconChevronsLeft size={18} />
              </button>
              <button
                disabled={page === 0}
                onClick={(e) => handleChangePage(e, page - 1)}
                className="bg-white text-orange-600 hover:bg-orange-100  border border-orange-600 px-1.5 py-1 rounded disabled:opacity-30"
              >
                <IconChevronLeft size={18} />
                <span className="sr-only">Previous</span>
              </button>
              <button
                disabled={
                  page >= Math.ceil(filteredData.length / rowsPerPage) - 1
                }
                onClick={(e) => handleChangePage(e, page + 1)}
                className="bg-white text-orange-600  hover:bg-orange-100 border border-orange-600 px-1.5 py-1 rounded disabled:opacity-30"
              >
                <span className="sr-only">Next</span>
                <IconChevronRight size={18} />
              </button>
              <button
                disabled={
                  page >= Math.ceil(filteredData.length / rowsPerPage) - 1
                }
                onClick={goToLastPage}
                className="bg-white text-orange-600 hover:bg-orange-100  border border-orange-600 px-1.5 py-1 rounded disabled:opacity-30"
              >
                <IconChevronsRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table2;

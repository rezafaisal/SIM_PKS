import { Button, Center, Loader, Popover, Select, Tabs } from "@mantine/core";
import { useAuth } from "features/auth";
import { Navigate } from "react-router-dom";
import { useImplementations } from "../api/getImplementation";
import { ImplementationTable } from "../components";
import { useJustProdi } from "../api/getJustProdi";
import { IconChevronDown } from "@tabler/icons";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGraphMonth } from "../api/getGraphMonth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedImplementationChart = ({ dataMonthGraph }: any) => {
  const bulanLabel = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const defaultColors = [
    "rgba(153, 102, 255, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(201, 203, 207, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(255, 99, 71, 0.6)",
    "rgba(201, 203, 207, 0.6)",
  ];

  const dataSetNew = (dataMonthGraph ?? []).map((item: any, index: any) => ({
    label: item.label,
    data: bulanLabel.map((_, monthIndex) => item.data[monthIndex + 1] || 0),
    backgroundColor: defaultColors[index % defaultColors.length],
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
  }));

  const data = {
    labels: bulanLabel,
    datasets: dataSetNew,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
    barThickness: 40,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: false,
        text: "Jumlah Implementasi per Prodi per Bulan",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        suggestedMax: 10,
        stacked: true,
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <section className="mt-5 text-gray-700 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-50">
      <div className="w-[900px] md:w-auto h-[350px]">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

const Implementation: React.FC = () => {
  const { creds } = useAuth();
  const accessPages = Array.isArray(creds?.access_page)
    ? creds?.access_page
    : [];

  const isAuthorized = ["implementasi"].some((page: any) =>
    accessPages?.includes(page)
  );
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  const { data, isLoading } = useImplementations();
  const { data: dataMonthGraph, isLoading: graphLoading } = useGraphMonth({
    params: { year: 2024, faculty: -1, prodi: -1 },
  });

  const { data: dataCoopProdi, isLoading: isLoadingCoop } = useJustProdi({
    creds,
  } as any);

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Implementasi Management
        </h1>
      </div>
      <div>
        <section className="bg-white px-5 pt-4 pb-6 rounded-xl shadow w-full mb-6">
          <div className="flex justify-between">
            <div>
              <div className=" text-black text-[22px] font-semibold ">
                Diagram Kerjasama
              </div>
              <div className=" text-gray-500 text-[13px] font-medium ">
                Ringkasan Total Laporan Data
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-x-2 gap-y-2 ">
              <Popover width={300} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Button
                    variant="outline"
                    color="gray"
                    size="xs"
                    rightIcon={<IconChevronDown className="" />}
                  >
                    Filter
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <div className="space-y-1">
                    <Select
                      size="xs"
                      label={<div>Tahun</div>}
                      data={[]}
                      variant="filled"
                      name="faculty"
                      withAsterisk={false}
                      styles={{
                        input: {
                          borderColor: "#00000035",
                          background: "#F9F9F9CC",
                        },
                      }}
                      // onChange={setFacultyValue}
                    />
                    <Select
                      size="xs"
                      label={<div>Fakultas</div>}
                      data={[]}
                      variant="filled"
                      name="faculty"
                      withAsterisk={false}
                      styles={{
                        input: {
                          borderColor: "#00000035",
                          background: "#F9F9F9CC",
                        },
                      }}
                      // onChange={setFacultyValue}
                    />

                    <Select
                      size="xs"
                      label={<div>Prodi</div>}
                      data={[]}
                      // disabled={facultyValue == ""}
                      variant="filled"
                      name="prody"
                      withAsterisk={false}
                      styles={{
                        input: {
                          borderColor: "#00000035",
                          background: "#F9F9F9CC",
                        },
                      }}
                      // {...form.getInputProps("prodi")}
                    />
                  </div>
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
          <StackedImplementationChart dataMonthGraph={dataMonthGraph} />
        </section>
      </div>
      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <ImplementationTable
            data={data ?? []}
            dataCoop={dataCoopProdi}
            isLoading={isLoading}
            levelStatus={creds?.level}
          />
        )}
      </section>
    </main>
  );
};

export default Implementation;

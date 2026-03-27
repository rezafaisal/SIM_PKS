import { Button, Center, Loader, Popover, Select, Tabs } from "@mantine/core";
import { DashboardTable } from "../components";
import {
  IconCheckbox,
  IconChevronDown,
  IconClockCancel,
  IconFolder,
  IconRefresh,
  IconSettingsOff,
} from "@tabler/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { YearPicker } from "@mantine/dates";
import dayjs from "dayjs";
import {
  useCollaborationFilters,
  useCollaborations,
} from "features/collaboration";
import { useCollaborationGraphMonths } from "../api/getCollaborationGraphMonth";
import { useCollaborationGraphYears } from "../api/getCollaborationGraphYear";
import { useAuth } from "features/auth";
import { Navigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labelsMonth = [
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

export const optionsMonth = {
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
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    y: {
      suggestedMax: 10,
      ticks: {
        precision: 0,
      },
    },
  },
};

const dataTempsMonth: { [key: string]: any }[] = [
  {
    tahun: dayjs(new Date()).format("YYYY"),
    months: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
    },
  },
];
const dataTempsYear: { [key: string]: any }[] = [
  {
    tahun: dayjs(new Date()).format("YYYY"),
    years: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    label: ["2019", "2020", "2021", "2022", "2023", "2024"],
  },
];

const Dashboard: React.FC = () => {
  const { creds } = useAuth();
  const accessPages = Array.isArray(creds?.access_page)
    ? creds?.access_page
    : [];

  const isAuthorized = ["dashboard"].some((page: any) =>
    accessPages?.includes(page)
  );
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  const { data, isLoading } = useCollaborations();
  const { data: dataFilter } = useCollaborationFilters();
  const [valueYear, setValueYear] = useState<Date | null>(new Date());
  const [regionSet, setRegionSet] = useState<any>("Semua");
  const { data: dataMonth } = useCollaborationGraphMonths({
    valueYear,
    regionSet,
  } as any);
  const { data: dataYear } = useCollaborationGraphYears({
    valueYear,
    regionSet,
  } as any);

  const [activeTabsCollab, setActiveTabsCollab] = useState("bulanan");

  const dataDiagramMonth = (
    dataMonth ? (dataMonth as { [key: string]: any }) : dataTempsMonth
  ).map((item: any) => {
    const data = new Array(12)
      .fill(1)
      .map((nums, index) => item.months[index + 1]);
    const backgroundColor = `rgba(244, 164, 86, 1)`;

    return {
      label: item.tahun.toString(),
      data,
      backgroundColor,
    };
  });

  const dataSetDiagramMonth = {
    labels: labelsMonth,
    datasets: dataDiagramMonth,
  };

  const dataDiagramYear = (
    dataYear ? (dataYear as { [key: string]: any }) : dataTempsYear
  ).map((item: any) => {
    const data = new Array(6)
      .fill(1)
      .map((nums, index) => item.years[index + 1]);
    const backgroundColor = `rgba(244, 164, 86, 1)`;

    return {
      label: item.tahun.toString(),
      data,
      backgroundColor,
    };
  });

  const dataSetDiagramYear = {
    labels: dataYear ? dataYear[0].label : dataTempsYear[0].label,
    datasets: dataDiagramYear,
  };

  return (
    <main className="mt-2">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">Dashboard</h1>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-y-5 gap-x-8 mb-8 md:mb-10 w-full">
        <section className="bg-white px-5 pt-4 pb-6 rounded-xl shadow w-full lg:w-[80%]">
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
                    {dayjs(valueYear).format("YYYY")}
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <YearPicker value={valueYear} onChange={setValueYear} />
                </Popover.Dropdown>
              </Popover>

              <Popover width={300} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Button
                    variant="outline"
                    color="gray"
                    size="xs"
                    rightIcon={<IconChevronDown className="" />}
                  >
                    {regionSet}
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Select
                    width={100}
                    placeholder="Pick value"
                    size="xs"
                    data={["Semua", "Nasional", "Internasional"]}
                    onChange={setRegionSet}
                    value={regionSet}
                  />
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
          <Tabs
            className="mt-4"
            variant="pills"
            defaultValue="bulanan"
            color="orange.5"
            styles={{
              tab: {
                borderStyle: "solid",
                borderWidth: "1px",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                "-webkit-box-shadow": "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
                "-moz-box-shadow": "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
              },
            }}
          >
            <Tabs.List className="pb-3 ">
              <Tabs.Tab
                value="bulanan"
                className={`  ${
                  activeTabsCollab == "bulanan"
                    ? "!text-white"
                    : "text-orange-500 font-semibold "
                }`}
                onClick={() => setActiveTabsCollab("bulanan")}
              >
                Bulanan
              </Tabs.Tab>
              <span className="flex text-[#E0E0E0] px-3 items-center">|</span>
              <Tabs.Tab
                value="tahunan"
                className={`  ${
                  activeTabsCollab == "tahunan"
                    ? "!text-white"
                    : "text-orange-500 font-semibold "
                }`}
                onClick={() => setActiveTabsCollab("tahunan")}
              >
                Tahunan
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="tahunan" className="mt-4">
              <section className="mt-5 text-gray-700 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-50">
                <div className="w-[900px] md:w-auto h-[350px]">
                  <Bar options={optionsMonth} data={dataSetDiagramYear} />
                </div>
              </section>
            </Tabs.Panel>

            <Tabs.Panel value="bulanan" className="mt-4">
              <section className="mt-5 text-gray-700 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-50">
                <div className="w-[900px] md:w-auto h-[350px]">
                  <Bar options={optionsMonth} data={dataSetDiagramMonth} />
                </div>
              </section>
            </Tabs.Panel>
          </Tabs>
        </section>
        <section className="grid grid-cols-2 lg:grid-cols-1 gap-x-5 gap-y-4 md:gap-x-9  w-full lg:w-[20%]">
          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-orange-400 text-white rounded-2xl">
            <div className="space-y-3.5 font-semibold text-white text-base md:text-[20px] ">
              <div>Total</div>
              <div>{dataFilter?.total ? dataFilter.total : 0}</div>
            </div>
            <div className=" rounded-full w-[58px] h-[56px] md:w-[7vw] md:h-[7vw] lg:w-[5vw] lg:h-[5vw]  bg-zinc-100 absolute -top-2 -right-2 flex items-center justify-center">
              <div className="bg-white rounded-full w-[42px] h-[40px] md:w-[5.5vw] md:h-[5.5vw] lg:w-[3.5vw] lg:h-[3.5vw]  shadow  flex items-center justify-center">
                <IconFolder className=" w-[28px] md:w-[3.7vw] lg:w-[2.4vw] h-auto text-orange-400" />
              </div>
            </div>
          </div>

          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-sky-400 text-white rounded-2xl">
            <div className="space-y-3.5 font-semibold text-white text-base md:text-[20px]">
              <div>Berjalan</div>
              <div>{dataFilter?.progress ? dataFilter.progress : 0}</div>
            </div>
            <div className=" rounded-full w-[58px] h-[56px] md:w-[7vw] md:h-[7vw] lg:w-[5vw] lg:h-[5vw]  bg-zinc-100 absolute -top-2 -right-2 flex items-center justify-center">
              <div className="bg-white rounded-full w-[42px] h-[40px] md:w-[5.5vw] md:h-[5.5vw] lg:w-[3.5vw] lg:h-[3.5vw]  shadow  flex items-center justify-center">
                <IconRefresh className=" w-[28px] md:w-[3.7vw] lg:w-[2.4vw] h-auto text-sky-400" />
              </div>
            </div>
          </div>
          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-yellow-400 text-white rounded-2xl">
            <div className="space-y-3.5 font-semibold text-white text-base md:text-[20px]">
              <div>Menjelang</div>
              <div className="">
                {dataFilter?.deadline ? dataFilter.deadline : 0}
              </div>
            </div>
            <div className=" rounded-full w-[58px] h-[56px] md:w-[7vw] md:h-[7vw] lg:w-[5vw] lg:h-[5vw]  bg-zinc-100 absolute -top-2 -right-2 flex items-center justify-center">
              <div className="bg-white rounded-full w-[42px] h-[40px] md:w-[5.5vw] md:h-[5.5vw] lg:w-[3.5vw] lg:h-[3.5vw]  shadow  flex items-center justify-center">
                <IconClockCancel className=" w-[28px] md:w-[3.7vw] lg:w-[2.4vw] h-auto text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-zinc-400 text-white rounded-2xl">
            <div className="space-y-3.5 font-semibold text-white text-base md:text-[20px]">
              <div>Tertunda</div>
              <div>{dataFilter?.hold ? dataFilter.hold : 0}</div>
            </div>
            <div className=" rounded-full w-[58px] h-[56px] md:w-[7vw] md:h-[7vw] lg:w-[5vw] lg:h-[5vw]  bg-zinc-100 absolute -top-2 -right-2 flex items-center justify-center">
              <div className="bg-white rounded-full w-[42px] h-[40px] md:w-[5.5vw] md:h-[5.5vw] lg:w-[3.5vw] lg:h-[3.5vw]  shadow  flex items-center justify-center">
                <IconSettingsOff className=" w-[28px] md:w-[3.7vw] lg:w-[2.4vw] h-auto text-zinc-400" />
              </div>
            </div>
          </div>
          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-5 py-3 md:py-4 bg-rose-400 text-white rounded-2xl">
            <div className="space-y-3.5 font-semibold text-white text-base md:text-[20px]">
              <div>Selesai</div>
              <div>{dataFilter?.complete ? dataFilter.complete : 0}</div>
            </div>
            <div className=" rounded-full w-[58px] h-[56px] md:w-[7vw] md:h-[7vw] lg:w-[5vw] lg:h-[5vw]  bg-zinc-100 absolute -top-2 -right-2 flex items-center justify-center">
              <div className="bg-white rounded-full w-[42px] h-[40px] md:w-[5.5vw] md:h-[5.5vw] lg:w-[3.5vw] lg:h-[3.5vw]  shadow  flex items-center justify-center">
                <IconCheckbox className=" w-[28px] md:w-[3.7vw] lg:w-[2.4vw] h-auto text-rose-400" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <DashboardTable data={data ?? []} />
        )}
      </section>
    </main>
  );
};

export default Dashboard;

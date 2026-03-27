import { Center, Loader } from "@mantine/core";
import { useCollaborations } from "../api";
import { CollaborationTable } from "../components";
import {
  IconCheckbox,
  IconClockCancel,
  IconFolder,
  IconRefresh,
  IconSettingsOff,
} from "@tabler/icons";
import { useCollaborationFilters } from "../api/getCollaborationFilter";
import { useAuth } from "features/auth";
import { Navigate } from "react-router-dom";

const Collaboration: React.FC = () => {
  const { creds } = useAuth();
  const accessPages = Array.isArray(creds?.access_page)
    ? creds?.access_page
    : [];

  const isAuthorized = ["kerjasama"].some((page: any) =>
    accessPages?.includes(page)
  );
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }
  const { data, isLoading } = useCollaborations();
  const { data: dataFilter } = useCollaborationFilters();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Perjanjian Kerjasama Management
        </h1>
      </div>
      <div>
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-7 md:gap-x-8 mb-8 md:mb-10 ">
          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-6 py-3 md:py-6 bg-orange-400 text-white rounded-2xl">
            <div className="space-y-3.5 font-semibold text-white text-base md:text-[20px]">
              <div>Total</div>
              <div>{dataFilter?.total ? dataFilter.total : 0}</div>
            </div>
            <div className=" rounded-full w-[58px] h-[56px] md:w-[7vw] md:h-[7vw] lg:w-[5vw] lg:h-[5vw]  bg-zinc-100 absolute -top-2 -right-2 flex items-center justify-center">
              <div className="bg-white rounded-full w-[42px] h-[40px] md:w-[5.5vw] md:h-[5.5vw] lg:w-[3.5vw] lg:h-[3.5vw]  shadow  flex items-center justify-center">
                <IconFolder className=" w-[28px] md:w-[3.7vw] lg:w-[2.4vw] h-auto text-orange-400" />
              </div>
            </div>
          </div>
          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-6 py-3 md:py-6 bg-sky-400 text-white rounded-2xl">
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
          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-6 py-3 md:py-6 bg-yellow-400 text-white rounded-2xl">
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
          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-6 py-3 md:py-6 bg-zinc-400 text-white rounded-2xl">
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
          <div className="relative shadow-lg gap-x-5 lg:gap-x-0 w-full items-center justify-between px-4 md:px-6 py-3 md:py-6 bg-rose-400 text-white rounded-2xl">
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
          <CollaborationTable
            data={data ?? []}
            isLoading={isLoading}
            levelStatus={creds?.level}
          />
        )}
      </section>
    </main>
  );
};

export default Collaboration;

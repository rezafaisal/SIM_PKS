import { Center, Loader, Tabs } from "@mantine/core";
import { useState } from "react";

import { useParams } from "react-router-dom";
import {
  CollaborationEditForm,
  CollaborationDocumentationTable,
} from "../components";
import CollaborationImplementationTable from "../components/implementation/CollaborationImplementationTable";
import { useByIdCollaborations } from "../api/getByIdCollaboration";
import { useFacultys } from "features/faculty";
import { useTypes } from "features/type";
import { useAuth } from "features/auth";

const CollaborationEditPage: React.FC = () => {
  const { creds } = useAuth();
  const { id } = useParams();
  const [activeTabs, setActiveTabs] = useState(
    creds?.level.name == "Admin" ? "pengajuan" : "implementasi"
  );
  const { data: dataType } = useTypes();

  const { data, isLoading } = useByIdCollaborations({ id });
  const { data: dataFaculty } = useFacultys();

  if (isLoading) {
    return (
      <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
        <Loader color="orange" />
      </Center>
    );
  }

  return (
    <main className="mt-2">
      <div className="mb-1 flex items-center justify-between">
        <h1 className="md:text-3xl pb-1 font-bold text-gray-800">
          Deskripsi dan Edit Pengajuan
        </h1>
      </div>

      <Tabs
        color="orange.4"
        defaultValue={
          creds?.level.name == "Admin" ? "pengajuan" : "implementasi"
        }
        className=""
      >
        <Tabs.List>
          {creds?.level.name == "Admin" ? (
            <Tabs.Tab
              value="pengajuan"
              className={` tracking-widest font-semibold font-['Public Sans'] px-2 md:px-4 text-xs  md:text-base ${
                activeTabs == "pengajuan"
                  ? "!text-orange-400"
                  : "text-[#00000066]"
              }`}
              onClick={() => setActiveTabs("pengajuan")}
            >
              PERJANJIAN KERJASAMA
            </Tabs.Tab>
          ) : (
            ""
          )}
          <Tabs.Tab
            value="implementasi"
            className={` tracking-widest font-semibold font-['Public Sans'] px-2 md:px-4 text-xs md:text-base ${
              activeTabs == "implementasi"
                ? "!text-orange-400"
                : "text-[#00000066]"
            }`}
            onClick={() => setActiveTabs("implementasi")}
          >
            IMPLEMENTASI
          </Tabs.Tab>
          <Tabs.Tab
            value="dokumentasi"
            className={` tracking-widest font-semibold font-['Public Sans'] px-2 md:px-4 text-xs md:text-base ${
              activeTabs == "dokumentasi"
                ? "!text-orange-400"
                : "text-[#00000066]"
            }`}
            onClick={() => setActiveTabs("dokumentasi")}
          >
            DOKUMENTASI
          </Tabs.Tab>
        </Tabs.List>
        <div className="mt-4 bg-white px-5 pt-2 pb-6 rounded-xl shadow">
          <Tabs.Panel pt="xs" value="pengajuan">
            <CollaborationEditForm
              dataCollab={data}
              dataFaculty={dataFaculty}
            />
          </Tabs.Panel>

          <Tabs.Panel pt="xs" value="dokumentasi">
            <CollaborationDocumentationTable
              dataDocumentation={data.documentation}
              partner={data.partner.partner_name}
              idCollab={data.id}
              dataType={dataType}
            />
          </Tabs.Panel>

          <Tabs.Panel pt="xs" value="implementasi">
            <CollaborationImplementationTable
              dataImplementation={data.implementation}
              dataProdi={data.prodi}
              idCollab={data.id}
            />
          </Tabs.Panel>
        </div>
      </Tabs>
    </main>
  );
};

export default CollaborationEditPage;

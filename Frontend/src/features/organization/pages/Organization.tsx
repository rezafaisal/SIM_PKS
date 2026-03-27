import { Center, Loader } from "@mantine/core";
import { useOrganizationLevels, useOrganizations } from "../api";
// import { OrganizationTable } from "../components";
import { useFacultys } from "features/faculty";
import { OrganizationTable } from "../components";

const Organization: React.FC = () => {
  const { data, isLoading } = useOrganizations();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Organization Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <OrganizationTable data={data} />
        )}
      </section>
    </main>
  );
};

export default Organization;

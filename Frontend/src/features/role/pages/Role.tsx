import { Center, Loader } from "@mantine/core";
import { useRoles } from "../api";
import { RoleTable } from "../components";
import { useAccessPages } from "../api/getAccessPages";

const Role: React.FC = () => {
  const { data, isLoading } = useRoles();
  const { data: dataPages } = useAccessPages();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Role Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <RoleTable data={data} dataPages={dataPages?.data_page} />
        )}
      </section>
    </main>
  );
};

export default Role;

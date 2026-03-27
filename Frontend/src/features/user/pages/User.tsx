import { Center, Loader } from "@mantine/core";
import { useUsers } from "../api";
import { UserTable } from "../components";
import { useRoles } from "features/role";

const User: React.FC = () => {
  const { data, isLoading } = useUsers();
  const { data: dataRole } = useRoles();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          User Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <UserTable data={data ? data : []} role={dataRole} />
        )}
      </section>
    </main>
  );
};

export default User;

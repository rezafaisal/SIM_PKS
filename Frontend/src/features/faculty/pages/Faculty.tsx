import { Center, Loader } from "@mantine/core";
import { useFacultys } from "../api";
import { FacultyTable } from "../components";
import { useNavigate } from "react-router-dom";

const Faculty: React.FC = () => {
  const { data, isLoading } = useFacultys();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Fakultas Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <FacultyTable data={data} />
        )}
      </section>
    </main>
  );
};

export default Faculty;

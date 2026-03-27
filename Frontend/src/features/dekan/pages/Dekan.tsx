import { Center, Loader } from "@mantine/core";
import { useDekans } from "../api";
import { DekanTable } from "../components";
import { useFacultys } from "features/faculty";

const Dekan: React.FC = () => {
  const { data, isLoading } = useDekans();
  const { data: dataFaculty } = useFacultys();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Dekan Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <DekanTable data={data} dataFaculty={dataFaculty} />
        )}
      </section>
    </main>
  );
};

export default Dekan;

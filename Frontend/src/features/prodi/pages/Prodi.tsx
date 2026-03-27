import { Center, Loader } from "@mantine/core";
import { useProdis } from "../api";
import { ProdiTable } from "../components";
import { useFacultys } from "features/faculty";

const Prodi: React.FC = () => {
  const { data, isLoading } = useProdis();
  const { data: dataFaculty } = useFacultys();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Prodi Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <ProdiTable data={data} dataFaculty={dataFaculty} />
        )}
      </section>
    </main>
  );
};

export default Prodi;

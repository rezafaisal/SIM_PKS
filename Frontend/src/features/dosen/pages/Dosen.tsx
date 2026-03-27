import { Center, Loader } from "@mantine/core";
import { useDosens } from "../api";
// import { DosenTable } from "../components";
import { useFacultys } from "features/faculty";
import { DosenTable } from "../components";

const Dosen: React.FC = () => {
  const { data, isLoading } = useDosens();
  console.log(data);

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Dosen Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <DosenTable data={data} />
        )}
      </section>
    </main>
  );
};

export default Dosen;

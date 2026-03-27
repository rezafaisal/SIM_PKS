import { Center, Loader } from "@mantine/core";
import { useTypes } from "../api";
import { TypeTable } from "../components";
import { IconHome } from "@tabler/icons";
import { IconChevronRight } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

const Type: React.FC = () => {
  const { data, isLoading } = useTypes();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Type Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <TypeTable data={data} />
        )}
      </section>
    </main>
  );
};

export default Type;

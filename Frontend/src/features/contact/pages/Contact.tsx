import { Center, Loader } from "@mantine/core";
import { useContacts } from "../api";
import { ContactTable } from "../components";
import { useNavigate } from "react-router-dom";
import { useFacultys } from "features/faculty";

const Contact: React.FC = () => {
  const { data, isLoading } = useContacts();
  const { data: dataFaculty } = useFacultys();

  return (
    <main className="mt-2">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-3xl pb-1 font-bold text-gray-800">
          Penghubung Fakultas Management
        </h1>
      </div>

      <section>
        {isLoading ? (
          <Center className="w-full h-full py-16 bg-body rounded-xl shadow">
            <Loader color="orange" />
          </Center>
        ) : (
          <ContactTable data={data} dataFaculty={dataFaculty} />
        )}
      </section>
    </main>
  );
};

export default Contact;

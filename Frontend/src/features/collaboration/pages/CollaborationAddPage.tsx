import { CollaborationAddForm } from "../components";
import { useFacultys } from "features/faculty";

const CollaborationAddPage: React.FC = () => {
  const { data: dataFaculty } = useFacultys();
  return (
    <main className="mt-2">
      <div className="mb-1 flex items-center justify-between">
        <h1 className="md:text-3xl pb-1 font-bold text-gray-800">
          Add Pengajuan
        </h1>
      </div>
      <div className="mt-4 bg-white px-5 pt-2 pb-6 rounded-xl shadow">
        <CollaborationAddForm dataFaculty={dataFaculty} />
      </div>
    </main>
  );
};

export default CollaborationAddPage;

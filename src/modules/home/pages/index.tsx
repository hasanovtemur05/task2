import GlobalTable from "../../../components/table";
import { useGetData } from "../hooks/queries";

const Index = () => {
  const { data, isLoading, error } = useGetData();
  if (isLoading) return <p className="text-center text-[40px] text-green-500 mt-[30%]">Loading...</p>;
  if (error) return <p className="text-center text-[40px] text-red-500 mt-[30%]">Error loading data!</p>;

  const rows = data || [];
  console.log(rows);

  const columns = [
    { id: "id", title: "ID", isRowHeader: true },
    { id: "title", title: "title" },
    { id: "body", title: "body" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Home</h1>
      <GlobalTable columns={columns} rows={rows} />
    </div>
  );
};

export default Index;

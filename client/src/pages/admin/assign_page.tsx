import SupervisorCard from "@/components/cards/supervisor-card";

const AssignPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="text-xl font-semibold mt-5">Assign Intern</span>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Example with multiple cards */}
        <SupervisorCard />
        <SupervisorCard />
        <SupervisorCard />
      </div>
    </div>
  );
};

export default AssignPage;

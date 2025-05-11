
import LackingRequirementTable from '@/components/lacking-requirement-table';

const LackingRequirementPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="text-xl font-semibold mt-5">View Tasks</span>
      <LackingRequirementTable />
    </div>
  );
};

export default LackingRequirementPage;

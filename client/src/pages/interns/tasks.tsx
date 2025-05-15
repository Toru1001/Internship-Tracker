import TasksTable from '@/components/tasks-table';

const TasksPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <span className="text-xl font-semibold mt-5">View Tasks</span>
      <TasksTable />
    </div>
  );
};

export default TasksPage;

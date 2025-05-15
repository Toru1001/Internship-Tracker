import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogTaskModal } from "./modal/log-task";
import { getTasks } from "@/lib/getData";
import { Tasks } from "./model/datamodel";
import { ViewTaskModal } from "./modal/view-task";

const TasksTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("All");
  const [filteredData, setFilteredData] = useState<Tasks[]>([]);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState(true); // Loader state

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterData(value, sortStatus);
  };

  const handleSort = (value: string) => {
    setSortStatus(value);
    filterData(searchTerm, value);
  };

  const filterData = (search: string, sort: string) => {
    let data = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search) ||
        task.status.toLowerCase().includes(search)
    );

    if (sort !== "All") {
      data = data.filter((task) => task.status === sort);
    }
    setFilteredData(data);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();

        const data = response.data.map((item: any) => ({
          status: item.status,
          taskid: item.task_id.task_id,
          log_id: item.log_id,
          title: item.task_id.title,
          description: item.task_id.task_description,
          start_time: item.task_id.start_time,
          end_time: item.task_id.end_time,
          date_logged: item.task_id.date_logged,
          start_proof: item.task_id.start_proof,
          end_proof: item.task_id.end_proof
        }));

        setTasks(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Failed to fetch tasks data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-4 w-200">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-1/4"
          />
          <Select value={sortStatus} onValueChange={handleSort}>
            <SelectTrigger className="w-1/6">
              <SelectValue placeholder="Sort by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="For review">For review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <LogTaskModal />
      </div>

      {loading ? (
        <div className="flex justify-center h-100 text-center my-10 text-muted-foreground">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Task ID</TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Start Time</TableHead>
                <TableHead className="text-center">End Time</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Date Logged</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((task) => (
                  <TableRow key={task.taskid}>
                    <TableCell className="text-center">{task.taskid}</TableCell>
                    <TableCell className="text-center">{task.title}</TableCell>
                    <TableCell className="text-center">
                      {task.description.length > 30
                        ? `${task.description.slice(0, 30)}...`
                        : task.description}
                    </TableCell>
                    <TableCell className="text-center">
                      {task.start_time}
                    </TableCell>
                    <TableCell className="text-center">{task.end_time}</TableCell>
                    <TableCell className="text-center">{task.status}</TableCell>
                    <TableCell className="text-center">
                      {task.date_logged}
                    </TableCell>
                    <TableCell className="text-center">
                      <ViewTaskModal data={task} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TasksTable;

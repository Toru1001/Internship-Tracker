import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const dummyData = [
  {
    taskId: 1,
    title: 'Task 1',
    description: 'Descrip for Task 1 sad sf a d asd asdw wadasd a asdasfa asdw',
    startDate: '2023-10-01',
    deadline: '2023-10-10',
    status: 'Pending',
    dateLogged: '2023-09-30',
  },
  {
    taskId: 2,
    title: 'Task 2',
    description: 'Description for Task 2',
    startDate: '2023-10-05',
    deadline: '2023-10-15',
    status: 'Completed',
    dateLogged: '2023-09-28',
  },
  {
    taskId: 3,
    title: 'Task 3',
    description: 'Description for Task 2',
    startDate: '2023-10-05',
    deadline: '2023-10-15',
    status: 'Completed',
    dateLogged: '2023-09-28',
  },
  {
    taskId: 4,
    title: 'Task 4',
    description: 'Description for Task 2',
    startDate: '2023-10-05',
    deadline: '2023-10-15',
    status: 'Completed',
    dateLogged: '2023-09-28',
  },
  {
    taskId: 5,
    title: 'Task 5',
    description: 'Description for Task 2',
    startDate: '2023-10-05',
    deadline: '2023-10-15',
    status: 'Completed',
    dateLogged: '2023-09-28',
  },
  // Add more dummy data as needed
];

const TasksTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
      const [sortStatus, setSortStatus] = useState('All');
      const [filteredData, setFilteredData] = useState(dummyData);
    
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
        let data = dummyData.filter(
          (task) =>
            task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search) ||
            task.status.toLowerCase().includes(search)
        );
    
        if (sort) {
          data = data.filter((task) => task.status === sort);
        }
    
        setFilteredData(data);
      };
  return (
    <div>
        <div className="flex gap-4 mb-4">
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
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
        
              <div className=" overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Logged</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((task) => (
                        <TableRow key={task.taskId}>
                          <TableCell>{task.taskId}</TableCell>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.description}</TableCell>
                          <TableCell>{task.startDate}</TableCell>
                          <TableCell>{task.deadline}</TableCell>
                          <TableCell>{task.status}</TableCell>
                          <TableCell>{task.dateLogged}</TableCell>
                          <TableCell>
                            <button className="text-blue-500 hover:underline">Edit</button>
                            <button className="text-red-500 hover:underline ml-2">Delete</button>
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
        
        </div>
  )
}

export default TasksTable
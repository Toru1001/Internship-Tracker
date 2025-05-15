import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from './ui/button';
import { Logs } from './model/datamodel';
import { getSupervisorLogs } from '@/lib/getData';
import { SendFeedbackModal } from './modal/send-feedback';

const LogsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortStatus, setSortStatus] = useState('All');
    const [filteredData, setFilteredData] = useState<Logs[]>([]);
    const [tasks, setTasks] = useState<Logs[]>([]);
    
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
    
        if (sort !== 'All') {
          data = data.filter((task) => task.status === sort);
        }
    
        setFilteredData(data);
      };

      useEffect(() => {
          const fetchTasks = async () => {
            try {
              const response = await getSupervisorLogs();
      
              const data = response.data.map((item: any) => ({
                log_id: item.log_id,
                status: item.status,
                taskid: item.task_id.task_id,
                title: item.task_id.title,
                description: item.task_id.task_description,
                start_time: item.task_id.start_time,
                end_time: item.task_id.end_time,
                date_logged: item.task_id.date_logged,
                name: item.task_id.intern_id.name,
                start_proof: item.task_id.start_proof,
                end_proof: item.task_id.end_proof
              }));
              console.log(data);
      
              setTasks(data);
              setFilteredData(data);
            } catch (error) {
              console.error("Failed to fetch tasks data:", error);
            }
          };
      
          fetchTasks();
        }, []);
  return (
    <div>
        <div className="flex justify-between mb-4">
          <div className="flex gap-4 w-200">
          <Input
                  placeholder="Search log..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-1/4"
                />
                <Select value={sortStatus} onValueChange={(value) => handleSort(value)}>
                  <SelectTrigger className="w-1/6">
                    <SelectValue placeholder="Sort by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="For review">For review</SelectItem>
                    <SelectItem value="Lacking requirement">Lacking Requirement</SelectItem>
                  </SelectContent>
                </Select>
          </div>
              </div>
        
              <div className=" overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Log ID</TableHead>
                      <TableHead>Intern Name</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Logged</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((log) => (
                        <TableRow key={log.taskid}>
                          <TableCell>{log.taskid}</TableCell>
                          <TableCell>{log.name}</TableCell>
                          <TableCell>{log.title}</TableCell>
                          <TableCell>
                            {log.description.length > 20
                              ? `${log.description.slice(0, 20)}...`
                              : log.description}
                          </TableCell>
                          <TableCell>{log.start_time}</TableCell>
                          <TableCell>{log.end_time}</TableCell>
                          <TableCell>{log.status}</TableCell>
                          <TableCell>{log.date_logged}</TableCell>
                          <TableCell>
                            <SendFeedbackModal data={log}/> 
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

export default LogsTable
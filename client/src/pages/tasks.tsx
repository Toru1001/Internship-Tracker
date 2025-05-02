import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

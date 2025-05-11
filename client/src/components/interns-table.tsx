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
import { Button } from "./ui/button";
import { AddInternModal } from "./modal/add-intern";
import { SupervisorInterns } from "./model/datamodel";
import { getInterns } from "@/lib/getData";
import { updateInternsHours } from "@/lib/insertData";
import { ViewInternModal } from "./modal/view-intern";

const InternsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("All");
  const [interns, setInterns] = useState<SupervisorInterns[]>([]);
  const [filteredData, setFilteredData] = useState<SupervisorInterns[]>([]);

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
    let data = interns.filter(
      (intern) =>
        intern.fullName.toLowerCase().includes(search) ||
        intern.email.toLowerCase().includes(search) ||
        intern.status.toLowerCase().includes(search) ||
        intern.internId.toString().includes(search) || 
        intern.dateStarted.toLowerCase().includes(search)
    );

    if (sort !== "All") {
      data = data.filter((intern) => intern.status === sort);
    }
    setFilteredData(data);
  };

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await getInterns();
        const data = response.data.map((item: any) => ({
          fullName: item.intern_id.name,
          dateStarted: item.start_date,
          email: item.intern_id.email,
          totalHours: item.total_hours,
          internId: item.internship_id,
          status: item.status,
        }));
        console.log(data);
        setInterns(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Failed to fetch interns data:", error);
      }
    };
    updateHours();
    fetchInterns();
  }, []);

  const updateHours = async() => {
    try {
      const update = await updateInternsHours();
      console.log(update);
    } catch (error) {
      console.error("Failed to fetch interns data:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-4 w-200">
          <Input
            placeholder="Search interns..."
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
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AddInternModal />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Intern ID</TableHead>
              <TableHead className="text-center">Full Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Date Started</TableHead>
              <TableHead className="text-center">Hours Worked</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((intern) => (
                <TableRow key={intern.internId}>
                  <TableCell className="text-center">{intern.internId}</TableCell>
                  <TableCell className="text-center">{intern.fullName}</TableCell>
                  <TableCell className="text-center">{intern.email}</TableCell>
                  <TableCell className="text-center">{intern.dateStarted}</TableCell>
                  <TableCell className="text-center">{intern.totalHours}</TableCell>
                  <TableCell className="text-center">{intern.status}</TableCell>
                  <TableCell className="text-center">
                    <ViewInternModal data={intern}/>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No interns found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InternsTable;

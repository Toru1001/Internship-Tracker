import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectIntern } from "../model/datamodel";
import { getAvailableInterns } from "@/lib/getData";
import { updateInternship } from "@/lib/insertData";

export function AddInternModal() {
  const [selectedInternId, setSelectedInternId] = useState<number | null>(null);
  const [interns, setInterns] = useState<SelectIntern[]>([]);

  const handleSelectIntern = (value: string) => {
    setSelectedInternId(Number(value));
  };

  const selectedIntern = interns.find(
    (intern) => intern.internId === selectedInternId
  );

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await getAvailableInterns();
        const data = response.data.map((item: any) => ({
          internId: item.internship_id,
          fullName: item.intern_id.name,
          email: item.intern_id.email,
        }));
        setInterns(data);
      } catch (error) {
        console.error("Failed to fetch interns data:", error);
      }
    };

    fetchInterns();
  }, []);

  const handleUpdate = async () => {
    if (!selectedInternId) return;

    try {
      await updateInternship(selectedInternId);
      alert("Intern successfully added to your team.");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update intern data:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-1 border-gray-950 bg-white text-black hover:bg-black hover:text-white cursor-pointer">
          Add Intern
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Intern</DialogTitle>
          <DialogDescription>
            To add an intern to your team, select an available intern below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="intern" className="text-right">
              Select Intern
            </Label>
            <Select onValueChange={handleSelectIntern}>
              <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Choose intern..." />
              </SelectTrigger>
              <SelectContent>
                {interns.length !== 0  ? interns.map((intern) => (
                  <SelectItem
                    key={intern.internId}
                    value={intern.internId.toString()}
                  >
                    {intern.fullName}
                  </SelectItem>
                )): <SelectItem value="none" disabled>No available interns</SelectItem>}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="intern-id" className="text-right">
              Intern ID
            </Label>
            <Input
              id="intern-id"
              placeholder="ID"
              value={selectedIntern?.internId || ""}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              value={selectedIntern?.email || ""}
              className="col-span-3"
              readOnly
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleUpdate}
            disabled={!selectedInternId}
            className="cursor-pointer"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

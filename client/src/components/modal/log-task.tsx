import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { insertTask, uploadProofs } from "@/lib/insertData";

export function LogTaskModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startProof, setStartProof] = useState<File | null>(null);
  const [endProof, setEndProof] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!startProof || !endProof) {
      alert("Please upload both start and end proof files.");
      return;
    }
    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);
      const startInMinutes = startHour * 60 + startMinute;
      const endInMinutes = endHour * 60 + endMinute;
      let workedMinutes = endInMinutes - startInMinutes;
      if (workedMinutes < 0) {
        workedMinutes += 24 * 60;
      }
      const workedHours = workedMinutes / 60;
      if (workedHours > 8) {
        alert("Total working hours cannot exceed 8 hours.");
        return;
      }
    }

    try {
      const uploadResponse = await uploadProofs(startProof, endProof);

      const { start_proof_url, end_proof_url } = uploadResponse.data;

      await insertTask(
        title,
        description,
        startTime,
        endTime,
        start_proof_url,
        end_proof_url
      );

      alert("Task logged successfully!");
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      window.location.reload();
    } catch (error) {
      console.error("Failed to log task:", error);
      alert("Failed to log task. Please try again.");
    }
  };

  const handleStartProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStartProof(e.target.files[0]);
    }
  };

  const handleEndProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEndProof(e.target.files[0]);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="border-1 border-gray-950 bg-white text-black hover:bg-black hover:text-white cursor-pointer">
          Log Task
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Log Task</SheetTitle>
          <SheetDescription>
            Fill in the details of your task. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-5">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Task title"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description"
              className="col-span-3"
              rows={8}
              cols={20}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-time" className="text-right">
              Start Time
            </Label>
            <Input
              id="start-time"
              type="time"
              className="col-span-3 w-fit"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end-time" className="text-right">
              End Time
            </Label>
            <Input
              id="end-time"
              type="time"
              className="col-span-3 w-fit"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 items-center mt-5 gap-4">
            <Label htmlFor="start-proof" className="text-right">
              Upload Start Proof
            </Label>
            <Input
              id="start-proof"
              type="file"
              className="col-span-3 w-fit border-1 border-gray-500"
              onChange={handleStartProofChange}
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="end-proof" className="text-right">
              Upload End Proof
            </Label>
            <Input
              id="end-proof"
              type="file"
              className="col-span-3 w-fit border-1 border-gray-500"
              onChange={handleEndProofChange}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={handleSubmit}>
              Save Task
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

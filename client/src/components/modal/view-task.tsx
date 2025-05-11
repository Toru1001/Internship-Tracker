import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

interface ViewTaskModalProps {
  data: any;
}

export function ViewTaskModal({ data }: ViewTaskModalProps) {

  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="hover:bg-amber-50 hover:text-gray-950 hover:border-1 hover:border-gray-950  cursor-pointer">
          View
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-xl border-b-1 border-b-gray-400 pb-3">
            Task Log
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-3 pb-4 px-5">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="title" className="text-right ">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Task title"
              className="col-span-3 border-1 border-gray-400 font-semibold"
              value={data.title}
              readOnly
            />
          </div>
          <div className="grid grid-cols-1 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description"
              className="col-span-3 border-1 border-gray-400"
              rows={8}
              cols={20}
              value={data.description}
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right ">
              Date
            </Label>
            <Input
              id="date"
              placeholder="Date Logged"
              className="col-span-3"
              value={data.date_logged}
              readOnly
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
              value={data.start_time}
              readOnly
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
              value={data.end_time}
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right ">
              Status
            </Label>
            <Input
              id="status"
              placeholder="Status"
              className="col-span-3 border-1 border-gray-400 font-semibold"
              value={data.status}
              readOnly
            />
          </div>
          <div className="grid grid-cols-1 items-start gap-4">
            <Label htmlFor="feedback" className="text-right pt-2">
              Supervisor Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Provide Feedback"
              className="col-span-3 border-1 border-gray-400"
              rows={8}
              cols={20}
              value={data.comment}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" className="cursor-pointer">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

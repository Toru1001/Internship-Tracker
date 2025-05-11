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

interface ViewInternModalProps {
  data: any;
}

export function ViewInternModal({ data }: ViewInternModalProps) {
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
            <Label htmlFor="name" className="text-right ">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Task title"
              className="col-span-3 border-1 border-gray-400 font-semibold"
              value={data.fullName}
              readOnly
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="email" className="text-right ">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Task title"
              className="col-span-3 border-1 border-gray-400 font-semibold"
              value={data.email}
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
              value={data.dateStarted}
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right ">
              Status
            </Label>
            <Input
              id="status"
              placeholder="Task title"
              className="col-span-3 border-1 w-fit border-gray-400 font-semibold"
              value={data.status}
              readOnly
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <Label htmlFor="hours-worked" className="text-right mt-15 text-lg">
              Total Hours Worked
            </Label>
            <span className="font-bold text-6xl">{data.totalHours} Hrs</span>
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

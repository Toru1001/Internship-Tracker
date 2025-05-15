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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ViewTaskFeedbackModalProps {
  data: any;
}

export function ViewTaskFeedbackModal({ data }: ViewTaskFeedbackModalProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <a className="text-gray-500 font-semibold hover:underline cursor-pointer">{data.title}</a>
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
              className="col-span-3 w-28 border-1 border-gray-500"
              value={data.date_logged}
              readOnly
            />
          </div>
          <div className="flex items-center gap-x-4">
            <Label htmlFor="start-time" className="text-right">
              Start Time
            </Label>
            <Input
              id="start-time"
              type="time"
              className="col-span-3 w-fit border-1 border-gray-500"
              value={data.start_time}
              readOnly
            />
            <Dialog>
              <DialogTrigger className="flex justify-center items-center cursor-pointer text-[14px] px-3 py-1.5 font-semibold bg-gray-800 rounded-sm text-amber-50 hover:bg-gray-800/90 ease-in-out">
                View Proof
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-lg border-b-1 border-gray-400 pb-1">
                    Start Proof
                  </DialogTitle>
                </DialogHeader>
                <div className="w-fit">
                  {data.start_proof && (
                    <img
                      src={data.start_proof}
                      alt="Product Preview"
                      className="w-100 max-h-125 object-cover rounded-2xl"
                    />
                  )}
                  <div className="flex w-full justify-end mt-3">
                    <a
                      href={data.start_proof}
                      target={data.start_proof}
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="border-1 border-[#E19517] text-[#E19517] hover:bg-[#E19517] hover:text-white font-semibold text-xs rounded cursor-pointer"
                      >
                        View Full Image
                      </Button>
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-x-4">
            <Label htmlFor="end-time" className="text-right">
              End Time
            </Label>
            <Input
              id="end-time"
              type="time"
              className="col-span-3 w-fit border-1 border-gray-500"
              value={data.end_time}
              readOnly
            />
            <Dialog>
              <DialogTrigger className="flex justify-center items-center cursor-pointer text-[14px] px-3 py-1.5 font-semibold bg-gray-800 rounded-sm text-amber-50 hover:bg-gray-800/90 ease-in-out">
                View Proof
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-lg border-b-1 border-gray-400 pb-1">
                    End Proof
                  </DialogTitle>
                </DialogHeader>
                <div className="w-fit">
                  {data.end_proof && (
                    <img
                      src={data.end_proof}
                      alt="Product Preview"
                      className="w-100 max-h-125 object-cover rounded-2xl"
                    />
                  )}
                  <div className="flex w-full justify-end mt-3">
                    <a
                      href={data.end_proof}
                      target={data.end_proof}
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="border-1 border-[#E19517] text-[#E19517] hover:bg-[#E19517] hover:text-white font-semibold text-xs rounded cursor-pointer"
                      >
                        View Full Image
                      </Button>
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right ">
              Status
            </Label>
            <Input
              id="status"
              placeholder="Status"
              className="col-span-3 border-1 border-gray-400 font-semibold"
              value={data.actual_status}
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
              value={data.feedback}
              readOnly
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

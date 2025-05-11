import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ViewTaskModal } from "../modal/view-task";
import { ViewTaskFeedbackModal } from "../modal/view-task-feedback";

interface FeedbacksCardProps{
  data?: any;
}

const FeedbacksCard = ({data}: FeedbacksCardProps) => {
  return (
    <Card className="bg-blue-100 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <CardHeader>
        <CardTitle className="flex gap-x-2">
          <span>{data.supervisor_name}</span>
          <span className="border-r-1 border-gray-500"></span>
          <span className="text-gray-500">Supervisor</span>
          </CardTitle>
        <CardDescription>Status: {data.status}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className=" bg-blue-200 rounded-xl px-5 mx-5 min-h-20 py-1">{data.feedback}</p>
        <div className="flex text-sm gap-x-3 mt-5">
          <span>Task:</span>
          <ViewTaskFeedbackModal data={data}/>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbacksCard;

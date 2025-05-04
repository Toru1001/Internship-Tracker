import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeedbacksCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supervisor</CardTitle>
        <CardDescription>Status: Cancelled</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="w-full bg-gray-200 rounded-xl px-5 py-1">Feedback Message</p>
        <div className="flex text-sm gap-x-3 mt-5">
          <span>Task:</span>
          <a href="" className="text-gray-500 underline">Task 1</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbacksCard;

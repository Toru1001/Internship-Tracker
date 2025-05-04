import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const SupervisorCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Full Name</CardTitle>
        <CardDescription>Supervisor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-x-2 items-center">
          <p className="flex justify-center items-center w-5 h-5 bg-blue-100 rounded-full p-1 text-xs font-semibold">
            1
          </p>
          <p className="text-sm">Intern/s</p>
        </div>

        <div className="flex text-sm gap-x-3 border-t-1 mt-2 justify-end">
          <Button className="border-1 border-gray-950 mt-2 bg-white text-black hover:bg-black hover:text-white cursor-pointer text-xs px-2 py-1">
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupervisorCard;

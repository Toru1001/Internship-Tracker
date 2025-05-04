export type User = {
    name: string;
    profileImage: "https://i.pravatar.cc/300", 
    role: string;
  };

export type SupervisorInterns = {
    internId: number;
    fullName: string;
    email: string;
    dateStarted: string;
    hoursWorked: number;
    status: string;
}

export type SelectIntern = {
    internId: number;
    fullName: string;
    email: string;
}

export type Tasks = {
    status: string;
    taskid: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    date_logged: string;
}

export type Logs = {
    status: string;
    taskid: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    date_logged: string;
    name: string;
}
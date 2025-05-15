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
    totalHours: number;
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
    log_id: number;
    description: string;
    start_time: string;
    end_time: string;
    date_logged: string;
    start_proof: string;
    end_proof: string;
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
    start_proof: string;
    end_proof: string;
}

export interface FeedbackData{
    log_id: number,
    feedback_id: number,
    feedback: string,
    supervisor_name: string,
    date: string,
    status: string,
    logData: any,
    start_proof: string;
    end_proof: string;
}
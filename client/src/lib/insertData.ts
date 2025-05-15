import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export const updateInternship = async (
  internshipId: number
): Promise<AxiosResponse> => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("No userId found in localStorage");
    }
    const response = await axiosInstance.put(`/interns/add?userId=${userId}`, {
      internshipId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const insertTask = async (
  title: string,
  description: string,
  start_time: string,
  end_time: string,
  start_proof: string,
  end_proof: string
): Promise<AxiosResponse> => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("No userId found in localStorage");
    }
    const response = await axiosInstance.post(`/task/log?userId=${userId}`, {
      title,
      description,
      start_time,
      end_time,
      start_proof,
      end_proof
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadProofs = async (
  startProofFile: File,
  endProofFile: File
): Promise<AxiosResponse> => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("No userId found in localStorage");
    }

    const formData = new FormData();
    formData.append("start_proof", startProofFile);
    formData.append("end_proof", endProofFile);

    const response = await axiosInstance.post(
      `/upload-proofs?userId=${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const provideFeedback = async (
  comments: string,
  log_id: number,
  status: string
): Promise<AxiosResponse> => {
  try {
    console.log(log_id, comments, status);
    const response = await axiosInstance.post(`/log/feedback`, {
      log_id: log_id,
      comments: comments,
      status: status,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateInternsHours = async (): Promise<AxiosResponse<any>> => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("No userId found in localStorage");
    }

    const response = await axiosInstance.post(`/update-total-hours`, null, {
      params: { userId },
    });

    return response;
  } catch (error: any) {
    console.error("Failed to update intern hours:", error.message || error);
    throw error;
  }
};

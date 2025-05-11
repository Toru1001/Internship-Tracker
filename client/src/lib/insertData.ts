import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export const updateInternship = async (internshipId: number): Promise<AxiosResponse> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axiosInstance.put(`/interns/add?userId=${userId}`, {internshipId});
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const insertTask = async (title: string, description: string, start_time: string, end_time: string): Promise<AxiosResponse> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axiosInstance.post(`/task/log?userId=${userId}`, {title, description, start_time, end_time});
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const provideFeedback = async (comments: string, log_id: number, status: string): Promise<AxiosResponse> => {
    try {
      console.log(log_id, comments, status);
      const response = await axiosInstance.post(`/log/feedback`, {'log_id': log_id,'comments': comments, 'status': status});
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const updateInternsHours = async (): Promise<AxiosResponse<any>> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
  
      const response = await axiosInstance.post(`/update-total-hours`, null, {
        params: { userId },
      });
  
      return response;
    } catch (error: any) {
      console.error('Failed to update intern hours:', error.message || error);
      throw error;
    }
  };
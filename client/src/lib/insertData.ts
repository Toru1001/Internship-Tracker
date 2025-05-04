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
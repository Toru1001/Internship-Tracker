import axiosInstance from './axiosInstance';
import axios, { AxiosResponse } from 'axios';

export const getUserData = async (): Promise<AxiosResponse> => {
  try {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      throw new Error('No userId found in localStorage');
    }
    const response = await axiosInstance.get(`/userdetails?userId=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getInterns = async (): Promise<AxiosResponse> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axiosInstance.get(`/interns?userId=${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };


  export const getAvailableInterns = async (): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.get(`/interns/available`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getLacking = async (): Promise<AxiosResponse> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axiosInstance.get(`/lacking?userId=${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getTasks = async (): Promise<AxiosResponse> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axios.get(`http://localhost:8000/get_tasks.php?userId=${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getSupervisorLogs = async (): Promise<AxiosResponse> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axiosInstance.get(`/supervisor/logs?userId=${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getSupervisorArchives = async (): Promise<AxiosResponse> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axiosInstance.get(`/supervisor/archives?userId=${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getFeedbacks = async (): Promise<AxiosResponse> => {
    try {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axiosInstance.get(`/feedbacks?userId=${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

    export const getFeedback = async (log_id: number): Promise<AxiosResponse> => {
    try {
      if (!log_id) {
        throw new Error('No userId found in localStorage');
      }
      const response = await axiosInstance.get(`/feedback/single?log_id=${log_id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
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

  // export const getTasks = async (): Promise<AxiosResponse> => {
  //   try {
  //     const userId = localStorage.getItem('userId');
  
  //     if (!userId) {
  //       throw new Error('No userId found in localStorage');
  //     }
  //     const response = await axiosInstance.get(`/tasks?userId=${userId}`);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

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
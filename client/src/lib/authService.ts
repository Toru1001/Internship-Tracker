import axiosInstance from './axiosInstance';  
import { AxiosResponse } from 'axios';

export const login = async (email: string, password: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signup = async (email: string, name: string, password: string, re_password:string, role: string): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.post('/signup', { email, password, name, re_password, role });
      return response;
    } catch (error) {
      throw error;
    }
  };
  
export const logoutUser = async () => {
    const access_token = localStorage.getItem("sessionToken");
    if (!access_token) throw new Error("No access token found");
  
    return axiosInstance.post("/logout", { access_token });
  };
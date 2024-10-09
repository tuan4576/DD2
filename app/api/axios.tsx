import axios, { AxiosInstance } from "axios";
import { API_URL } from "./config";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CustomAxiosInstance extends AxiosInstance {
  enableUploadFile: () => void;
  enableJson: () => void;
}

const axiosInstance: CustomAxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
}) as CustomAxiosInstance;

axiosInstance.enableUploadFile = function() {
  this.defaults.headers['Content-Type'] = 'multipart/form-data';
};

axiosInstance.enableJson = function() {
  this.defaults.headers['Content-Type'] = 'application/json';
};

// Interceptor to update the token before each request
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
import axios from 'axios';
import { QualityControlData } from './interfaces';
const API_URL = import.meta.env.API_URL;


const axiosGET = (endPoint: string, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios
    .get(endPoint, { headers })
    .then((response) => response.data)
    .catch((error) => {
      console.error('GET error:', error);
    });
};


const axiosPOST = (endPoint: string, data: unknown) => {
  return axios
    .post(endPoint, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error('POST error:', error);
    });
};


export const getQualityControl = async (): Promise<QualityControlData[]> => {
  const endPoint = `${API_URL}/quality_control`;
  return axiosGET(endPoint);
};


export const postCall = async (data: string): Promise<unknown> => {
  const endPoint = `${API_URL}/post_call`;
  return axiosPOST(endPoint, data);
};



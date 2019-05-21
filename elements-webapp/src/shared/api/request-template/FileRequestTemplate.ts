import { API } from '@shared/api/request-template/AxiosInstance';
import { AxiosResponse } from 'axios';

export const FILE_POST = async (path: string, data: FormData): Promise<AxiosResponse> => {
  try {
    return await API().post(path, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (e) {
    console.log(`postTemplate(): ${e}\n path: ${path}\n data: ${data}`);
    return null;
  }
};

export const FILE_PUT = async (path: string, data: FormData): Promise<AxiosResponse> => {
  try {
    return await API().put(path, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (e) {
    console.log(`postTemplate(): ${e}\n path: ${path}\n data: ${data}`);
    return null;
  }
};

export const GET_FILE = async (fileName: string): Promise<AxiosResponse> => {
  try {
    return await API().get(`/file/${fileName}`, { responseType: 'arraybuffer' });
  } catch (e) {
    console.log(`getImageTemplate(): ${e}\n fileName: ${fileName}`);
    return null;
  }
};


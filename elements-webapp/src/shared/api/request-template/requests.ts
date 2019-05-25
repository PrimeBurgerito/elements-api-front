import { API } from '@shared/api/request-template/AxiosInstance';
import { requestErrorNotice } from '@shared/notice/notices';
import { LoadingStore } from '@shared/store/LoadingStore';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const GET_LOADING = 'GET_LOADING';
export const POST_LOADING = 'POST_LOADING';
export const PUT_LOADING = 'PUT_LOADING';
export const DELETE_LOADING = 'DELETE_LOADING';

export const GET = async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  LoadingStore.addRequest(GET_LOADING);
  return await API().get(path, config)
    .finally(() => LoadingStore.endRequest(GET_LOADING))
    .catch((e: AxiosError) => {
      requestErrorNotice(e);
      console.log(`getTemplate(): ${e}\n path: ${path}`);
      return null;
    });

};

export const POST = async (path: string, body = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
  LoadingStore.addRequest(POST_LOADING);
  return await API().post(path, body, config)
    .finally(() => LoadingStore.endRequest(POST_LOADING))
    .catch((e: AxiosError) => {
      requestErrorNotice(e);
      console.log(`postTemplate(): ${e}\n path: ${path}\n body: ${body}`);
      return null;
    });
};

export const PUT = async (path: string, body: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  LoadingStore.addRequest(PUT_LOADING);
  try {
    return await API().put(path, body, config);
  } catch (e) {
    console.log(`postTemplate(): ${e}\n path: ${path}\n body: ${body}`);
    return null;
  } finally {
    LoadingStore.endRequest(PUT_LOADING);
  }
};

export const DELETE = async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  LoadingStore.addRequest(DELETE_LOADING);
  return await API().delete(path, config)
    .finally(() => LoadingStore.endRequest(DELETE_LOADING))
    .catch((e: AxiosError) => {
      requestErrorNotice(e);
      console.log(`deleteTemplate(): ${e}\n path: ${path}`);
      return null;
    });
};




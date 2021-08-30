import { API } from '@shared/api/request-template/AxiosInstance';
import { requestErrorNotice } from '@shared/notice/notices';
import { LoadingStore } from '@shared/store/LoadingStore';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const GET_LOADING = 'GET_LOADING';
export const POST_LOADING = 'POST_LOADING';
export const PUT_LOADING = 'PUT_LOADING';
export const DELETE_LOADING = 'DELETE_LOADING';

export const GET = async <T>(path: string, config?: AxiosRequestConfig, disableNotice?: boolean): Promise<AxiosResponse<T>> => {
  LoadingStore.addRequest(GET_LOADING);
  return await API().get<T>(path, config)
    .finally(() => LoadingStore.endRequest(GET_LOADING))
    .catch((e: AxiosError) => {
      if (!disableNotice) {
        requestErrorNotice(e);
        console.error(`getTemplate(): ${e}\n path: ${path}`);
      }
      return null;
    });

};

export const POST = async <T>(path: string, body = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
  LoadingStore.addRequest(POST_LOADING);
  return await API().post<T>(path, body, config)
    .finally(() => LoadingStore.endRequest(POST_LOADING))
    .catch((e: AxiosError) => {
      requestErrorNotice(e);
      console.error(`postTemplate(): ${e}\n path: ${path}\n body: ${body}`);
      return null;
    });
};

export const PUT = async <T>(path: string, body: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  LoadingStore.addRequest(PUT_LOADING);
  return await API().put<T>(path, body, config)
    .finally(() => LoadingStore.endRequest(PUT_LOADING))
    .catch((e: AxiosError) => {
      requestErrorNotice(e);
      console.error(`postTemplate(): ${e}\n path: ${path}\n body: ${body}`);
      return null;
    });
};

export const DELETE = async <T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  LoadingStore.addRequest(DELETE_LOADING);
  return await API().delete<T>(path, config)
    .finally(() => LoadingStore.endRequest(DELETE_LOADING))
    .catch((e: AxiosError) => {
      requestErrorNotice(e);
      console.error(`deleteTemplate(): ${e}\n path: ${path}`);
      return null;
    });
};




import { store } from 'react-easy-state';

export const LoadingStore = store({
  requests: new Map<string, number>(),
  isLoading: (key: string): boolean => !!LoadingStore.requests.get(key),

  addRequest: (key: string): void => {
    const requestCount = LoadingStore.requests.get(key);
    if (requestCount) {
      LoadingStore.requests.set(key, requestCount + 1);
    } else {
      LoadingStore.requests.set(key, 1);
    }
  },

  endRequest: (key: string): void => {
    const requestCount = LoadingStore.requests.get(key);
    if (requestCount) {
      LoadingStore.requests.set(key, requestCount - 1);
    }
  },
});

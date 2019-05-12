import { store } from 'react-easy-state';

export const LoadingStore = store({
  requests: 0,
  get isLoading() { return LoadingStore.requests > 0; },
  addRequest: () => LoadingStore.requests++,
  endRequest: () => {
    LoadingStore.requests--;
    if (LoadingStore.requests < 0) {
      LoadingStore.requests = 0;
    }
  },
});

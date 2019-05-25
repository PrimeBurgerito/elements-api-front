import { IUser } from '@type/user';
import { store } from 'react-easy-state';

interface IUserStore {
  user: IUser;
  isAuthenticated: boolean;
}

const UserStore = store<IUserStore>({
  user: null,
  get isAuthenticated() { return !!UserStore.user; },
});

export default UserStore;

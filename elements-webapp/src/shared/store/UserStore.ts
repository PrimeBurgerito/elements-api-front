import { IUser } from '@type/user';
import { store } from 'react-easy-state';

interface IUserStore {
  user: IUser;
  isAuthenticated: () => boolean;
}

const UserStore = store<IUserStore>({
  user: null,
  isAuthenticated: () => !!UserStore.user,
});

export default UserStore;

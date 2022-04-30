import { TUser } from '../../types/types';
import { ActionType } from '../action-types/auth';
import { AuthAction } from '../actions/auth';

interface InitialState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TUser | null;
}

const initialState: InitialState = {
  token: localStorage.getItem('token'), // null
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export default function (state = initialState, action: AuthAction<string | TUser>): InitialState {
  const { type, payload } = action;

  switch (type) {
    case ActionType.REGISTER_SUCCESS:
    case ActionType.LOGIN_SUCCESS:
      localStorage.setItem('token', payload as string);
      return { ...state, token: payload as string, isAuthenticated: true, isLoading: false };
    case ActionType.LOAD_USER:
      return { ...state, user: payload as TUser, isAuthenticated: true, isLoading: false };
    case ActionType.AUTH_ERROR:
    case ActionType.REGISTER_FAIL:
    case ActionType.LOGIN_FAIL:
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false, isLoading: false };
    case ActionType.LOGOUT:
      localStorage.removeItem('token');
      return { ...state, token: null, user: null, isAuthenticated: false, isLoading: false };
    default:
      return state;
  }
}

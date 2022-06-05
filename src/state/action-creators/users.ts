import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { AuthAction } from '../actions/auth';
import { ActionType } from '../action-types/auth';
import setAuthToken from '../../utils/setAuthToken';
// TYPES
import { TUser } from '../../types/types';

export const loadUser =
  () =>
  async (dispatch: Dispatch<AuthAction<TUser>>): Promise<void> => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = (await axios.get('/api/users')) as AxiosResponse<TUser>;
      dispatch({ type: ActionType.LOAD_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: ActionType.AUTH_ERROR });
    }
  };

import axios, { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from '../action-types/auth';
import { AuthAction } from '../actions/auth';
import { TUserInput, TLoginForm, TUser } from '../../types/types';
import { loadUser } from './users';
import { setAlert } from './alert';
import { RootState } from '../store';
import { ValidationError } from '../../types/error';

export const register =
  ({ name, email, password, gender }: TUserInput) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthAction<string | TUser>>): Promise<void> => {
    const body = JSON.stringify({ name, email, password, gender });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = (await axios.post('/api/users', body, config)) as AxiosResponse<{ token: string }>;
      dispatch({ type: ActionType.REGISTER_SUCCESS, payload: res.data.token });
      dispatch(loadUser());
    } catch (err: any) {
      const errors = err.response.data.errors as ValidationError[];
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      dispatch({
        type: ActionType.REGISTER_FAIL,
      });
      // console.error(err);
      throw Error;
    }
  };

export const login =
  ({ email, password }: TLoginForm) =>
  async (dispatch: ThunkDispatch<RootState, void, AnyAction>): Promise<void> => {
    const body = JSON.stringify({ email, password });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = (await axios.post('/api/auth', body, config)) as AxiosResponse<{ token: string }>;
      // if (!res.data.token) {
      //   dispatch({ type: ActionType.LOGIN_FAIL });
      // }
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: res.data.token });
      dispatch(loadUser());
    } catch (err: any) {
      const errors = err.response.data.errors as ValidationError[];
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      dispatch({ type: ActionType.LOGIN_FAIL });
      // console.error(err);
      throw Error;
    }
  };

export const logout = () => (dispatch: any) => {
  dispatch({ type: ActionType.LOGOUT });
};

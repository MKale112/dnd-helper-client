import axios, { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
// AUTH
import { ActionType } from '../action-types/auth';
import { AuthAction } from '../actions/auth';
import { TUserInput, TLoginForm } from '../../types/types';
import { ValidationError } from '../../types/error';
// LOAD USER
import { loadUser } from './users';
// ALERT
import { setAlert } from './alert';
import { AlertType } from '../actions/alert';

export const register =
  ({ name, email, password, gender }: TUserInput) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthAction<string>>): Promise<void> => {
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
      errors.forEach((error) => dispatch(setAlert(error.msg, AlertType.ERROR)));
      dispatch({
        type: ActionType.REGISTER_FAIL,
      });
      throw Error;
    }
  };

export const login =
  ({ email, password }: TLoginForm) =>
  async (dispatch: ThunkDispatch<RootState, void, AuthAction<string>>): Promise<void> => {
    const body = JSON.stringify({ email, password });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = (await axios.post('/api/auth', body, config)) as AxiosResponse<{
        token: string;
      }>;
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: res.data.token });
      dispatch(loadUser());
    } catch (err: any) {
      const errors = err.response.data.errors as ValidationError[];
      errors.forEach((error) => dispatch(setAlert(error.msg, AlertType.ERROR)));
      dispatch({ type: ActionType.LOGIN_FAIL });
      throw Error;
    }
  };

export const logout =
  () =>
  (dispatch: any): void => {
    dispatch({ type: ActionType.LOGOUT });
  };

import React, { Dispatch } from 'react';
import { v4 } from 'uuid';
import { ActionType } from '../action-types/alert';
import { AlertAction } from '../actions/alert';
import {AlertType} from '../actions/alert'



export const setAlert =
  (msg: string, alertType: AlertType, timeout = 5000) =>
  (dispatch: Dispatch<AlertAction>) => {
    const id = v4();
    dispatch({ type: ActionType.SET_ALERT, payload: { id, msg, alertType } });
    setTimeout(
      () =>
        dispatch({
          type: ActionType.REMOVE_ALERT,
          payload: { id },
        }),
      timeout,
    );
  };

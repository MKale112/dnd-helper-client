import { ActionType } from '../action-types/alert';
import { AlertAction } from '../actions/alert';

interface Alerts {
  id: string;
  msg: string;
  alertType: string;
}

const initialState: Alerts[] = [];

export default function (state = initialState, action: AlertAction) {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_ALERT:
      return [...state, payload];
    case ActionType.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload.id);
    default:
      return state;
  }
}

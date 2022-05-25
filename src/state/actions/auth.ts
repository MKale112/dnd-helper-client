import { ActionType } from '../action-types/auth';
export interface AuthAction<T> {
  type: ActionType;
  payload?: T;
}

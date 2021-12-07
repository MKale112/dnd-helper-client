import { ActionType } from '../action-types/auth';

// export interface RegisterActionSuccess {
//   type: ActionType.REGISTER_SUCCESS;
//   payload?: string;
// }

// export interface RegisterActionFail {
//   type: ActionType.REGISTER_FAIL;
// }

// export interface LoadUserAction {
//   type: ActionType.LOAD_USER;
//   payload?: TUser;
// }

// export interface AuthErrorAction {
//   type: ActionType.AUTH_ERROR;
// }

export interface AuthAction<T> {
  type: ActionType;
  payload?: T;
}

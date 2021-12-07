import { ActionType } from '../action-types/alert';

export enum AlertType {
  INFO = "info",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export interface AlertAction {
  type: ActionType;
  payload: {
    id: string;
    msg?: string;
    alertType?: AlertType;
  };
}

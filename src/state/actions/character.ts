import { ActionType } from '../action-types/character';

export interface CharacterAction<T> {
  type: ActionType;
  payload?: T;
}

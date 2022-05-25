import { combineReducers } from 'redux';

import auth from './auth';
import alert from './alert';
import character from './character';

export const RootReducer = combineReducers({
  auth,
  alert,
  character,
});

import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import { RootReducer } from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(RootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
// or should here be AppDispatch instead of AnyAction?

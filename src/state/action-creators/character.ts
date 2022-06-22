import axios, { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { FormikValues } from 'formik';
import { RootState } from '../store';
// CHARACTER IMPORTS
import { ActionType } from '../action-types/character';
import { CharacterAction } from '../actions/character';
import { CharacterCreationInput, ICharacter } from '../../types/character';
import { ValidationError } from '../../types/error';
// ALERT
import { setAlert } from './alert';
import { AlertType } from '../actions/alert';

export const createCharacter =
  (
    {
      characterName,
      race,
      characterClass,
      gender,
      level,
      attributes,
      weapon,
      armor,
      shield,
      bio,
      wallet,
    }: FormikValues,
    id: string,
  ) =>
  async (dispatch: ThunkDispatch<RootState, void, CharacterAction<CharacterCreationInput>>): Promise<void> => {
    const body = JSON.stringify({
      playerId: id,
      characterName,
      race,
      characterClass,
      gender,
      level,
      attributes,
      weapon,
      armor,
      shield,
      bio,
      wallet,
    });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = (await axios.post(`/api/characters`, body, config)) as AxiosResponse<ICharacter>;
      console.log('character creation call: ', res.data);
      dispatch({ type: ActionType.CREATE_CHARACTER, payload: res.data });
    } catch (err: any) {
      const errors = err.response.data.errors as ValidationError[];
      if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, AlertType.ERROR)));
      dispatch({
        type: ActionType.CREATE_CHARACTER_FAIL,
      });
      throw Error;
    }
  };

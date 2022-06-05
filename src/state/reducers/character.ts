import { CharacterRace, CharacterStatus, ICharacter } from '../../types/character';
import { ActionType } from '../action-types/character';
import { CharacterAction } from '../actions/character';

type InitialState = ICharacter;

const initialState: InitialState = {
  _id: '',
  playerId: '',
  characterName: '',
  gender: undefined,
  status: CharacterStatus.ALIVE,
  race: CharacterRace.HUMAN,
  level: 1,
  characterClass: '',
  attributes: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  saves: {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
  },
  proficiencyBonus: 0,
  weapon: '',
  armor: '',
  shield: false,
  hitpointMax: 0,
  bio: '',
  wallet: {
    cp: 0,
    sp: 0,
    gp: 0,
  },
};

export default function (state = initialState, action: CharacterAction<ICharacter>): InitialState {
  const { type, payload } = action;

  switch (type) {
    case ActionType.CREATE_CHARACTER:
      return { ...state, ...payload };
    case ActionType.CREATE_CHARACTER_FAIL:
      return state;
    default:
      return state;
  }
}

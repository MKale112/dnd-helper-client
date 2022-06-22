export enum CharacterGender {
  'MALE' = 'male',
  'FEMALE' = 'female',
  'OTHER' = 'other',
}

export enum CharacterRace {
  'HUMAN' = 'human',
  'ELF' = 'elf',
  'DWARF' = 'dwarf',
  'HALFLING' = 'halfling',
  'ORC' = 'orc',
}

export enum CharacterStatus {
  'ALIVE' = 'alive',
  'DEAD' = 'dead',
}

export enum CharacterClass {
  'FIGHTER' = 'fighter',
  'WIZARD' = 'wizard',
  'ROGUE' = 'rogue',
}

export interface CharacterCreationInput {
  characterName: string;
  gender?: CharacterGender;
  race?: CharacterRace;
  characterClass: string;
  level: number;
  attributes?: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  weapon?: string;
  armor?: string;
  shield: boolean;
  bio?: string;
  wallet?: { cp: number; sp: number; gp: number };
}

export interface ICharacter {
  playerId: string;
  _id: string;
  characterName: string;
  gender?: CharacterGender;
  race: CharacterRace;
  status: CharacterStatus;
  characterClass: string;
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  saves: {
    strength: boolean;
    dexterity: boolean;
    constitution: boolean;
    intelligence: boolean;
    wisdom: boolean;
    charisma: boolean;
  };
  proficiencyBonus: number;
  weapon?: string;
  armor: string;
  shield: boolean;
  hitpointMax: number;
  bio: string;
  wallet: { cp: number; sp: number; gp: number };
}

export interface ICharacterCard {
  gender?: string;
  race: CharacterRace;
  level: number;
  characterClass: string;
  status: CharacterStatus;
}

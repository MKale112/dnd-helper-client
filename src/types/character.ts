export enum CharacterGender {
  'MALE' = 'male',
  'FEMALE' = 'female',
  'OTHER' = 'other',
  'NONDISCLOSABLE' = 'nondisclosable',
}

export enum CharacterRace {
  'HUMAN' = 'human',
  'ELF' = 'elf',
  'DWARF' = 'dwarf',
  'HALFLING' = 'halfling',
  'ORC' = 'orc',
}

export interface CharacterCreationInput {
  characterName: string;
  race: CharacterRace;
  characterClass: string;
  gender: CharacterGender;
  level: number;
  attributes?: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  // "none" | "proficient"
  skills?: {
    acrobatics: boolean;
    animalHandling: boolean;
    arcana: boolean;
    athletics: boolean;
    deception: boolean;
    history: boolean;
    insight: boolean;
    intimidation: boolean;
    investigation: boolean;
    medicine: boolean;
    nature: boolean;
    perception: boolean;
    performance: boolean;
    persuasion: boolean;
    religion: boolean;
    sleightOfHand: boolean;
    stealth: boolean;
    survival: boolean;
  };
  armorClass?: number;
  bio?: string;
  equipment?: [{ name: string; description: string }];
  wallet?: { cp: number; sp: number; gp: number };
}

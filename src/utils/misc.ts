import { CampaignStatus } from '../types/campaign';
import { CharacterClass, CharacterStatus } from '../types/character';

export const capitalizeString = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const getAttributeSnippet = (str: string): string => `${str.substring(0, 3).toUpperCase()}`;

export const getAttributeBonus = (attribute: number): number => {
  if (attribute < 5) return 2;
  // eslint-disable-next-line
  else if (attribute >= 5 && attribute < 9) return 3;
  else if (attribute >= 9 && attribute < 13) return 4;
  else if (attribute >= 13 && attribute < 17) return 5;

  return 6;
};

const greetings = ['Welcome back,', 'Ready for a session,', 'Howdy,', 'Prepare yourself,', 'Draw your weapon,'];

export const userGreeting = (username: string): string => {
  const greetingId = Math.floor(Math.random() * greetings.length);
  const usernameCapitalized = capitalizeString(username);
  const greeting = `${greetings[greetingId]} ${usernameCapitalized}!`;
  return greeting;
};

export const classColorMap = new Map<CharacterClass, string>([
  [CharacterClass.FIGHTER, '#B22B27'],
  [CharacterClass.ROGUE, '#321A18'],
  [CharacterClass.WIZARD, '#683996'],
]);

export const statusCampaignColorMap = new Map<CampaignStatus, string>([
  [CampaignStatus.ONGOING, '#f1c232'],
  [CampaignStatus.FINISHED, '#360568'],
  [CampaignStatus.CANCELLED, '#CC021A'],
  [CampaignStatus.HIATUS, '#FF8300'],
]);

export const statusCharColorMap = new Map<CharacterStatus, string>([
  [CharacterStatus.ALIVE, '#37C5CE'],
  [CharacterStatus.DEAD, '#360568'],
]);

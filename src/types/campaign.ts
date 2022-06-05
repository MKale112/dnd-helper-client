import { EPurpose } from './types';

export interface ICampaignInput {
  name: string;
  description: string;
}

export interface ICampaign extends ICampaignInput {
  id: string;
  DMprivateNotes: string[];
  DMpublicNotes: string[];
  players: string[];
  status: CampaingStatus;
}

export enum CampaingStatus {
  'ONGOING' = 'ongoing',
  'FINISHED' = 'finished',
  'HIATUS' = 'hiatus',
  'CANCELLED' = 'cancelled',
}

export interface ICampaignCard {
  name: string;
  DM: string;
  dateStarted?: string;
  dateEnded?: string;
  status: CampaingStatus;
}

export interface ICampaignInput {
  campaignName: string;
  description: string;
  imgUrl: string;
}

export interface Player {
  user: string;
  character: string;
}

export interface ICampaign extends ICampaignInput {
  _id: string;
  DM: string;
  DMname: string;
  characters: Player[];
  status: CampaignStatus;
  dateStarted: string;
  dateEnded: string;
  // DMprivateNotes: string[];
  // DMpublicNotes: string[];
}

export enum CampaignStatus {
  'ONGOING' = 'ongoing',
  'FINISHED' = 'finished',
  'HIATUS' = 'hiatus',
  'CANCELLED' = 'cancelled',
}

export interface ICampaignCard {
  DMname: string;
  dateStarted: string;
  dateEnded?: string;
}

export enum TGender {
  'MALE' = 'male',
  'FEMALE' = 'female',
  'OTHER' = 'other',
}

export interface TUserInput {
  name: string;
  email: string;
  password: string;
  gender: TGender;
}

export type TLoginForm = Omit<TUserInput, 'name' | 'gender'>;

export interface TUser extends Omit<TUserInput, 'password' | 'gender'> {
  _id: string;
  avatar?: string;
  characters: Array<string>;
}

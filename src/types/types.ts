export type TGender = 'male' | 'female' | 'other' | '';

export interface TUserInput {
  name: string;
  email: string;
  password: string;
  gender: TGender;
}

export type TLoginForm = Omit<TUserInput, 'name' | 'gender'>;

export interface TUser extends TUserInput {
  id: string;
  avatar?: string;
  date: Date;
}

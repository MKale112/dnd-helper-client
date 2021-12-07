export type ValidationError = {
  param: '_error';
  msg: any;
  nestedErrors: ValidationError[];
  location?: undefined;
  value?: undefined;
};

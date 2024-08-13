export type APIError = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};

export type User = {
  name: string;
  iconUrl?: string;
};

export type SignInResponse = {
  token: string;
};

export type CreateUserResponse = SignInResponse;

export type UploadUserIconResponse = {
  iconUrl: string;
};

export type UpdateUserResponse = {
  name: string;
};

export type Review = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
};

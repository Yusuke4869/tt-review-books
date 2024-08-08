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

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  success?: boolean;
  error?: string;
};

export type SignOutResult = {
  success?: boolean;
  error?: string;
};

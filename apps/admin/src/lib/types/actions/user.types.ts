export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type UpdateUserInput = {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
};

export type CreateUserResult = {
  success?: boolean;
  error?: string;
  user?: User;
};

export type UpdateUserResult = {
  success?: boolean;
  error?: string;
  user?: User;
};

export type DeleteUserResult = {
  success?: boolean;
  error?: string;
};

export type ToggleUserStatusResult = {
  success?: boolean;
  error?: string;
  user?: User;
};

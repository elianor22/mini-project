export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IFormUser extends IUser {
  password: string;
}

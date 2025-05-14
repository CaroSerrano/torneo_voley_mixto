export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnedUser extends IUser {
  _id: string;
}
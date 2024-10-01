export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  ci: string;
  email: string;
  password: string;
  deleted: boolean;
  firstLogin: boolean;
}

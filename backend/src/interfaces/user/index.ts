export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserListOne {
  authorization?: string;
}

export interface IDeleteUser {
  id: string;
}

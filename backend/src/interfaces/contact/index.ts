export interface IContactrCreate {
  name: string;
  email: string;
  phone: string;
  userEmail: string;
}

export interface IContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
  userEmail?: string;
}

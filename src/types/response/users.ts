export interface IResponseUser {
  total: number;
  page: number;
  limit: number;
  data: IDataUser[];
}

export interface IDataUser {
  _id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

import axiosInstance from "@/config/axios";
import { CreateAxiosDefaults } from "axios";

interface IOptions extends CreateAxiosDefaults {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
}

export class BaseService {
  subUrl: string;
  constructor(subUrl: string) {
    this.subUrl = subUrl;
  }

  async get(options?: IOptions) {
    const res = await axiosInstance.get(this.subUrl, { ...options });
    return res.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T>(data: T): Promise<any> {
    const res = await axiosInstance.post<T>(this.subUrl, data);
    return res.data;
  }

  async delete(id: string) {
    const res = await axiosInstance.delete(`${this.subUrl}/${id}`);
    return res.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async patch(id: string, payload: any) {
    const res = await axiosInstance.patch(`${this.subUrl}/${id}`, payload);
    return res.data;
  }
}

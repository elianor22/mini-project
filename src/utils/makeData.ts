import { IUser } from "@/types/user";
import { faker } from "@faker-js/faker";

export const makeData = (len: number = 1000): IUser[] => {
  const data: IUser[] = [];

  for (let i = 0; i < len; i++) {
    data.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      status: Math.random() < 0.5 ? "Active" : "Inactive",
    });
  }
  return data;
};

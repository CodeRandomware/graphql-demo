import { User } from "./usertypes";

export type CreateProduct = {
  input: {
    name: string;
    description: string;
  };
};

export type ContextType = {
  bearer: string;
  user: User["result"];
};

export type UpdateProduct = {
  input: {
    id: Buffer;
    body: {
      name: string;
      description: string;
    };
  };
};

export type DeleteProduct = {
  input: {
    id: Buffer;
  };
};

export type Product = {
  result: {
    _id: { data: any };
    id: Buffer;
    name: string;
    description: string;
    owner: Buffer;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type LoginUser = {
  input: {
    emailAddress: string;
    password: string;
  };
};

export type CreateUser = {
  input: {
    emailAddress: string;
    firstname: string;
    lastname: string;
    password: string;
  };
};

export type ID = {
  id: Buffer;
};

export type User = {
  result: {
    id: Buffer;
    firstname: string;
    lastname: string;
    emailAddress: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

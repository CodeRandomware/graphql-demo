import { ApolloError } from "apollo-server-core";
import { addProduct, addUser, login } from "../functions/post";
import { ContextType, CreateProduct } from "../functions/producttypes";
import { LoginUser, CreateUser } from "../functions/usertypes";

export const mutations_resolver = {
  Mutation: {
    signUp(_: undefined, { input }: CreateUser) {
      return addUser(input);
    },
    authenticate(_: undefined, { input }: LoginUser) {
      return login(input);
    },
    createProduct(
      _: undefined,
      { input }: CreateProduct,
      context: ContextType
    ) {
     return addProduct(input, context.user);
    },
  },
  Authentication: {
    token: (parent: string) => {
      return parent;
    },
  },
};

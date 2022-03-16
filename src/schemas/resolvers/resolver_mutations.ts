import { delete_Product } from "../functions/delete";
import { addProduct, addUser, login } from "../functions/post";
import {
  ContextType,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../functions/producttypes";
import { update_Product } from "../functions/put";
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
      return addProduct(input, Buffer.from(context.user.id));
    },
    updateProduct(
      _: undefined,
      { input }: UpdateProduct,
      context: ContextType
    ) {
      return update_Product(input, Buffer.from(context.user.id));
    },
    deleteProduct(
      _: undefined,
      { input }: DeleteProduct,
      context: ContextType
    ) {
      return delete_Product(input.id, Buffer.from(context.user.id));
    },
  },

  Authentication: {
    token: (parent: string) => {
      return parent;
    },
  },
};

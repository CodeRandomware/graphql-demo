import { checkID, getAccount, getPaginatedProducts } from "../functions/get";
import { ContextType, Product } from "../functions/producttypes";
import { ID } from "../functions/usertypes";

export const queries_resolver = {
  Query: {
    me: async (_: undefined, __: undefined, { user }: ContextType) => {
      return user;
    },
    node: async (_: undefined, { id }: ID) => {
      return checkID(id);
    },
    products: async (_: undefined, args: any) => {
      return getPaginatedProducts(args);
    },
  },

  Node: {
    __resolveType: ({ id }: ID) => {
      if (id.includes("product", 32)) {
        return "Product";
      } else if (id.includes("account", 32)) {
        return "Account";
      } else {
        return null;
      }
    },
  },

  Product: {
    id: async (product: Product["result"]) => {
      return product.id || Buffer.from(product._id.data).toString();
    },
    owner: async ({ owner }: Product["result"]) => {
      return getAccount(owner);
    },
  },
};

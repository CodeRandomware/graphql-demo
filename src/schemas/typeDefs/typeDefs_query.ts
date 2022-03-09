import { gql } from "apollo-server-core";

export const query_typeDefs = gql`
  type Query {
    accounts: [Account]
    products: [Product]
    account(id: Binary!): Account
    product(id: Binary!): Product
    node(id: Binary!): Node!
    me: Account! @private
  }
`;

import { gql } from "apollo-server-core";

export const query_typeDefs = gql`
  type Query {
    node(id: Binary!): Node!
    me: Account! @private
    products(
      first: Int = 10
      after: Cursor
      filter: ProductsFilter
      sort: ProductSortInput
    ): ProductConnection!
  }
`;

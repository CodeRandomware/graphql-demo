import { gql } from "apollo-server-core";

export const types_typeDefs = gql`
  type Account implements Node {
    id: Binary!
    firstname: String!
    lastname: String!
    emailAddress: EmailAddress!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Product implements Node {
    id: Binary!
    name: String!
    description: String!
    owner: Account!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Authentication {
    token: String!
  }

  type ProductConnection {
    edges: [ProductEdge!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: Cursor
  }

  type ProductEdge {
    cursor: Cursor!
    node: Product!
  }
`;

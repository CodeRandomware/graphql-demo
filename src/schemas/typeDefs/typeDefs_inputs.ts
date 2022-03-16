import { gql } from "apollo-server-core";

export const inputs_typeDefs = gql`
  input SignUpInput {
    emailAddress: EmailAddress!
    firstname: String!
    lastname: String!
    password: String!
  }

  input AuthenticateInput {
    emailAddress: EmailAddress!
    password: String!
  }

  input CreateProductInput {
    name: String!
    description: String!
  }

  input UpdateProductInput {
    id: Binary!
    body: UpdateProductBody!
  }

  input UpdateProductBody {
    name: String
    description: String
  }

  input DeleteProductInput {
    id: Binary!
  }

  input ProductsFilter {
    id: BinaryQueryOperatorInput
    name: StringQueryOperatorInput
  }

  input ProductSortInput {
    name: Int
  }

  input BinaryQueryOperatorInput {
    eq: Binary
    ne: Binary
    in: [Binary!]
    nin: [Binary!]
  }

  input StringQueryOperatorInput {
    eq: String
    ne: String
    in: [String!]
    nin: [String!]
    startsWith: String
    contains: String
  }
`;

import { gql } from "apollo-server-core";

export const mutation_typeDefs = gql`
  type Mutation {
    signUp(input: SignUpInput!): Authentication!
    authenticate(input: AuthenticateInput!): Authentication!
  }
`;
import { gql } from "apollo-server-koa";
import { mutations_resolver } from "./resolvers/resolver_mutations";
import { queries_resolver } from "./resolvers/resolver_query";
import { binaryScalar } from "./scalars/binary";
import { cursorScalar } from "./scalars/cursor";
import { dateTimeScalar } from "./scalars/datetime";
import { emailAddScalar } from "./scalars/emailadd";
import { inputs_typeDefs } from "./typeDefs/typeDefs_inputs";
import { mutation_typeDefs } from "./typeDefs/typeDefs_mutations";
import { query_typeDefs } from "./typeDefs/typeDefs_query";
import { types_typeDefs } from "./typeDefs/typeDefs_types";

const rootDef = gql`
  scalar Binary
  scalar EmailAddress
  scalar DateTime
  scalar Cursor

  directive @private on OBJECT | FIELD_DEFINITION

  interface Node {
    id: Binary!
  }
`;

export const typeDefs = [
  rootDef,
  inputs_typeDefs,
  mutation_typeDefs,
  query_typeDefs,
  types_typeDefs,
];

//Resolver
export const resolvers = {
  Binary: binaryScalar,
  EmailAddress: emailAddScalar,
  DateTime: dateTimeScalar,
  Cursor: cursorScalar,

  ...queries_resolver,

  ...mutations_resolver,
};

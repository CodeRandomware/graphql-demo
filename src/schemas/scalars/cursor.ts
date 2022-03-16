import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

export const cursorScalar = new GraphQLScalarType({
  name: "Cursor",
  description: "Cursor custom scalar type",
  serialize(value: any) {
    return value.toString("base64");
  },
  parseValue(value: any) {
    return Buffer.from(value, "base64");
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query Error: Can only parse strings as ids but got a: ${ast.kind}`
      );
    }

    return Buffer.from(ast.value, "base64");
  },
});

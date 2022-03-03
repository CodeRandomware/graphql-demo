import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { ApolloError } from "apollo-server-core";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import { verify } from "jsonwebtoken";
import { checkID } from "../functions/get";

export function privateDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const privateDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (privateDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        let result: unknown;

        fieldConfig.resolve = async function (source, args, context, info) {
          const userInfo: any = verify(context.bearer, "RANDOM_STRING");

          if (userInfo && (context.user = await checkID(userInfo.user_id))) {
            result = await resolve(source, args, context, info);
          } else {
            throw new ApolloError("Invalid Token", "INVALID_TOKEN");
          }

          return result;
        };

        return fieldConfig;
      }
    },
  });
}

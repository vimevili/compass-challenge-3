import "reflect-metadata";

import path from "node:path";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { ProductResolver } from "./resolvers/ProductResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ProductResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });
  const server = new ApolloServer({
    schema,
  });
  const { url } = await server.listen(4000);
  console.log(`🚀 HTTP server running on ${url}`);
}

bootstrap();

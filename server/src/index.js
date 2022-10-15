import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { resolvers } from "./resolvers.js"
import { readFile } from "fs/promises"

// async function startApolloServer() {
//     const server = new ApolloServer({ typeDefs, resolvers })
//     const { url } = await startStandaloneServer(server, {
//         context: async ({ req }) => ({ token: req.headers.token }),
//         listen: { port: 4000 },
//     })
//     console.log(`🚀  Server ready at ${url}`)
// }

const typeDefs = await readFile("./src/schema.graphql", "utf8")

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}graphql`)

import { ApolloServer } from '@apollo/server'
// import { startStandaloneServer } from "@apollo/server/standalone"
import { resolvers } from './resolvers.js'
import { readFile } from 'fs/promises'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import fs from 'fs'

// async function startApolloServer() {
//     const server = new ApolloServer({ typeDefs, resolvers })
//     const { url } = await startStandaloneServer(server, {
//         context: async ({ req }) => ({ token: req.headers.token }),
//         listen: { port: 4000 },
//     })
//     console.log(`🚀  Server ready at ${url}`)
// }

const typeDefs = await readFile('./src/schema.graphql', 'utf8')
const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(
  '/graphql',
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  }),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
)

// app.get('/image/:name', cors({ origin: 'http://localhost:3000' }), (req, res) => {
//   const imageName = req.params.name
//   let image
//   try {
//     // res.json({ req: 'Testing', file: '/data/images/' })
//     image = fs.readFileSync('data/images/' + imageName)
//     res.type('image/svg')
//     res.send(image)
//   } catch (error) {
//     console.log(error)
//     res.send('There was an error, yo!')
//   }
// })

await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))

console.log(`🚀 Server ready at http://localhost:4000/graphql`)
// const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//     context: async ({ req, res }) => ({}),
// })

//console.log(`🚀  Server ready at: ${url}graphql`)

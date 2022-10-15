import { Book } from "./db.js"

export const resolvers = {
    Query: {
        books: () => Book.findAll(),
    },
}

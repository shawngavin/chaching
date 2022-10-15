import { Database } from "fakebase"

const db = new Database("./data")

export const Book = db.table("books")
